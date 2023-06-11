import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Card, List, Text } from "react-native-paper";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Review } from "../../models/review";
import agent from "../../api/agent";
import { Boat } from "../../models/boat";
import { MAX_RECORDS_PER_VIEW } from "../../api/constants";
import { useAuthContext } from "../../context/AuthContext";
import StarRating from "react-native-star-rating-widget";
import RenderHtml from "react-native-render-html";

interface ReviewListProps {
  item: Boat;
  refreshing: boolean;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewList = ({ item, refreshing, setRefreshing }: ReviewListProps) => {
  const [reviews, setReviews] = useState<Review[]>();
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuthContext();
  const { height, width } = useWindowDimensions();

  const fetchData = (maxRecords: number, offset: number) => {
    agent.Reviews.getPaginatedReviews(item.Id, maxRecords, offset, (res) => {
      const parsedRes = JSON.parse(res);

      if (parsedRes.length === 0) {
        return;
      }

      if (!refreshing) {
        setReviews(parsedRes);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (refreshing) {
      setReviews([]);
      setOffset(0);
      setRefreshing(false);
      setLoading(false);
    } else {
      fetchData(MAX_RECORDS_PER_VIEW, offset);
    }
  }, [offset, refreshing]);

  return (
    <View>
      {loading || refreshing ? (
        <ActivityIndicator color="blue" />
      ) : (
        <Card style={styles.container}>
          <List.Accordion
            title="Reviews"
            style={{ backgroundColor: "inherit" }}
          >
            {reviews?.map((review) => (
              <Card.Content>
                <Text>
                  {review.CreatedBy.Name} - {review.CreatedBy.CompanyName}
                </Text>
                <Text>{new Date(review.CreatedDate).toLocaleString()}</Text>
                <List.Item
                  title={review.Name}
                  description={() => (
                    <View>
                      <RenderHtml
                        source={{ html: review.Comment__c }}
                        contentWidth={width}
                      />
                      <StarRating
                        rating={review.Rating__c}
                        enableSwiping={false}
                        onChange={() => {}}
                      />
                    </View>
                  )}
                  key={review.Id}
                  left={() => (
                    <List.Image
                      source={{
                        uri: review.CreatedBy.SmallPhotoUrl,
                        headers: {
                          Authorization: `Bearer ${accessToken}`,
                        },
                      }}
                    />
                  )}
                />
              </Card.Content>
            ))}
          </List.Accordion>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    margin: 15,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
});

export default ReviewList;
