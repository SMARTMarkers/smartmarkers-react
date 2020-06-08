import React from "react";
import { Spinner, ListItem, Body, Right, Text, Icon } from "native-base";
import { useFhirContext } from "../context";
import { Report, ReportType } from "./Report";

export interface ReportListProps {
  type: ReportType;
  filter?: string;
  renderItem?: (item: Report, key: any) => React.ReactNode;
}

export const ReportList: React.FC<ReportListProps> = (props) => {
  const { type, renderItem, filter } = props;
  const typeStr = ReportType[type];
  const [isReady, setIsReady] = React.useState(false);
  const [items, setItems] = React.useState<Report[] | undefined>([]);
  const { fhirClient } = useFhirContext();

  const defaultRenderItem = (item: Report, key: any) => (
    <ListItem key={key}>
      <Body>
        <Text>{item.getTitle()}</Text>
        <Text note>{item.getNote()}</Text>
      </Body>
      <Right>
        <Icon active name="arrow-forward" />
      </Right>
    </ListItem>
  );
  const render = renderItem ? renderItem : defaultRenderItem;

  React.useEffect(() => {
    const loadItems = async () => {
      const items = await fhirClient?.patient.request(
        filter ? `${typeStr}?${filter}` : typeStr,
        {
          pageLimit: 0,
          flat: true,
        }
      );
      setItems(items as Report[]);
      setIsReady(true);
    };
    loadItems();
  }, []);

  if (!isReady) {
    return <Spinner />;
  }
  return <>{items?.map((item, index) => render(item, index))}</>;
};
