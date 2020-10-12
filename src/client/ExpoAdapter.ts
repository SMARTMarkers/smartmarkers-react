import { ready, authorize, init } from "fhirclient/lib/smart";
import Client from "fhirclient/lib/Client";
import { fhirclient } from "fhirclient/lib/types";
import { ExpoStorage } from "./ExpoStorage";

/**
 * Expo Adapter
 */
const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
export class ExpoAdapter implements fhirclient.Adapter {
  /**
   * Stores the URL instance associated with this adapter
   */
  private _url: URL | null = null;

  /**
   * Holds the Storage instance associated with this instance
   */
  private _storage: fhirclient.Storage | null = null;

  /**
   * Environment-specific options
   */
  options: fhirclient.BrowserFHIRSettings;

  /**
   * @param options Environment-specific options
   */
  constructor(options: fhirclient.BrowserFHIRSettings = {}) {
    this.options = {
      // Replaces the browser's current URL
      // using window.history.replaceState API or by reloading.
      replaceBrowserHistory: true,

      // When set to true, this variable will fully utilize
      // HTML5 sessionStorage API.
      // This variable can be overridden to false by setting
      // FHIR.oauth2.settings.fullSessionStorageSupport = false.
      // When set to false, the sessionStorage will be keyed
      // by a state variable. This is to allow the embedded IE browser
      // instances instantiated on a single thread to continue to
      // function without having sessionStorage data shared
      // across the embedded IE instances.
      fullSessionStorageSupport: true,

      ...options,
    };
  }

  /**
   * Given a relative path, returns an absolute url using the instance base URL
   */
  relative(path: string): string {
    return new URL(path, this.getUrl().href).href;
  }

  /**
   * In browsers we need to be able to (dynamically) check if fhir.js is
   * included in the page. If it is, it should have created a "fhir" variable
   * in the global scope.
   */
  get fhir() {
    // @ts-ignore
    return typeof fhir === "function" ? fhir : null;
  }

  /**
   * Given the current environment, this method must return the current url
   * as URL instance
   */
  getUrl(): URL {
    if (!this._url) {
      if (location) {
        this._url = new URL(location + "");
      } else {
        console.error("`location` is not available on mobile");
        this._url = new URL(location + "");
      }
    }
    return this._url;
  }

  /**
   * Given the current environment, this method must redirect to the given
   * path
   */
  redirect(to: string): void {
    if (location) {
      location.href = to;
    } else {
      console.error("`location` is not available on mobile");
    }
  }

  /**
   * Returns a ExpoStorage object which is just a wrapper around
   * sessionStorage
   */
  getStorage(): ExpoStorage {
    if (!this._storage) {
      this._storage = new ExpoStorage();
    }
    return this._storage;
  }

  /**
   * Returns a reference to the AbortController constructor. In browsers,
   * AbortController will always be available as global (native or polyfilled)
   */
  getAbortController() {
    return AbortController;
  }

  /**
   * ASCII string to Base64
   */
  atob(str) {
    if (window && window.atob) return window.atob(str);

    let tmpStr = str.replace(/=+$/, "");
    let output = "";

    if (tmpStr.length % 4 == 1) {
      throw new Error(
        "'atob' failed: The string to be decoded is not correctly encoded."
      );
    }
    for (
      let bc = 0, bs = 0, buffer, i = 0;
      (buffer = tmpStr.charAt(i++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
  /**
   * Base64 to ASCII string
   */
  btoa(str) {
    if (window && window.btoa) return window.btoa(str);

    let tmpStr = str;
    let output = "";

    for (
      let block = 0, charCode, i = 0, map = chars;
      tmpStr.charAt(i | 0) || ((map = "="), i % 1);
      output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
    ) {
      charCode = tmpStr.charCodeAt((i += 3 / 4));

      if (charCode > 0xff) {
        throw new Error(
          "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
        );
      }

      block = (block << 8) | charCode;
    }

    return output;
  }

  /**
   * Creates and returns adapter-aware SMART api. Not that while the shape of
   * the returned object is well known, the arguments to this function are not.
   * Those who override this method are free to require any environment-specific
   * arguments. For example in node we will need a request, a response and
   * optionally a storage or storage factory function.
   */
  getSmartApi(): fhirclient.SMART {
    return {
      ready: (...args: any[]) => ready(this, ...args),
      authorize: (options) => authorize(this, options),
      init: (options) => init(this, options),
      client: (state: string | fhirclient.ClientState) =>
        new Client(this, state),
      options: this.options,
    };
  }
}
