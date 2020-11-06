import React from "react";
import { Spinner, ListItem, Body, Right, Text, Icon } from "native-base";
import { useFhirContext } from "../context";
import { Report, ReportType } from "../reports/Report";
import { ReportFactory } from "../reports/ReportFactory";

export interface ReportListProps {
  type: ReportType;
  filter?: string;
  renderItem?: (item: Report, key: any) => React.ReactNode;
  onItemPress: (item: Report) => void;
  useClientPatientId?: boolean;
}

export const ReportList: React.FC<ReportListProps> = (props) => {
  const {
    type,
    renderItem,
    filter,
    onItemPress,
    useClientPatientId = true,
  } = props;
  const [isReady, setIsReady] = React.useState(false);
  const [items, setItems] = React.useState<Report[] | undefined>([]);
  const { server } = useFhirContext();

  const defaultRenderItem = (
    item: Report,
    key: any,
    onItemPress: (item: Report) => void
  ) => (
    <ListItem key={key} onPress={() => onItemPress(item)}>
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
      if (server) {
        const items = await server?.getPatientReports(
          type,
          filter,
          useClientPatientId
        );

        const factory = new ReportFactory(server);
        const reports = items.map((i: any) => factory.createReport(i));
        setItems(reports);
      }

      setIsReady(true);
    };
    loadItems();
  }, []);

  if (!isReady) {
    return <Spinner />;
  }

  if (items?.length) {
    return <>{items?.map((item, index) => render(item, index, onItemPress))}</>;
  } else {
    return (
      <ListItem>
        <Body>
          <Text note>NO ITEMS</Text>
        </Body>
      </ListItem>
    );
  }
};
