import React from "react";
import AutocompleteInput from "react-native-autocomplete-input";
import { Text, Item, Input, Spinner, ListItem, View } from "native-base";

export interface AutocompleteProps<T> {
  value?: FetchResponseItem;
  onChange?: (value: FetchResponseItem) => void;
  fetchUrl: string;
}

export interface FetchResponseItem {
  code: string;
  text: string;
}

export const Autocomplete: React.FC<AutocompleteProps<any>> = (props) => {
  const { value, onChange } = props;

  const [query, setQuery] = React.useState(value ? value.text : "");
  const [options, setOptions] = React.useState<FetchResponseItem[]>([]);
  const [hideResults, setHideResults] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onItemPress = (item: FetchResponseItem) => () => {
    setQuery(item.text);
    setHideResults(true);
    if (onChange) {
      onChange(item);
    }
  };

  const onChangeText = (text: string) => {
    setQuery(text);
    setHideResults(false);
  };

  React.useEffect(() => {
    let active = true;

    if (query.length < 1) {
      setOptions([]);
      return undefined;
    }

    const fetchData = async () => {
      const response = await fetch(`${props.fetchUrl}?terms=${query}`);

      const respomseItems = await response.json();

      if (active) {
        const codes = respomseItems[1] as any[];
        const labels = respomseItems[3] as any[];
        const items = codes.map((value, index) => {
          return { code: value, text: labels[index][0] } as FetchResponseItem;
        });

        setOptions(items);
        setLoading(false);
      }
    };

    setLoading(true);
    fetchData();

    return () => {
      active = false;
    };
  }, [query, props.value, props.fetchUrl]);

  return (
    <View>
      <AutocompleteInput
        data={options}
        defaultValue={query}
        keyExtractor={(item: FetchResponseItem) => item.code}
        hideResults={hideResults}
        onChangeText={onChangeText}
        onBlur={() => setHideResults(true)}
        onFocus={() => setHideResults(false)}
        renderTextInput={(props) => (
          <Item regular>
            <Input {...props} value={query} style={{ borderWidth: 0 }} />
            {loading && <Spinner style={{ height: 50 }} />}
          </Item>
        )}
        renderItem={({ item, index }) => (
          <ListItem button key={index} onPress={onItemPress(item)}>
            <Text>{item.text}</Text>
          </ListItem>
        )}
      />
    </View>
  );
};
