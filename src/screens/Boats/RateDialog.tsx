import React, { useState } from "react";
import {
  Portal,
  Dialog,
  Button,
  TextInput,
  HelperText,
  Text,
} from "react-native-paper";
import { Boat } from "../../models/boat";
import StarRating from "react-native-star-rating-widget";
import agent from "../../api/agent";
import Snackbar from "react-native-snackbar";

interface RateDialogProps {
  showRateDialog: {
    show: boolean;
    item: Boat;
  };
  setShowRateDialog: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      item: Boat;
    }>
  >;
}

const RateModal = ({ showRateDialog, setShowRateDialog }: RateDialogProps) => {
  const { item } = showRateDialog;
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState(false);

  const closeDialog = () => {
    setShowRateDialog({ show: false, item: {} as Boat });
    setSubject("");
    setComment("");
    setRating(0);
    setErrors(false);
  };

  return (
    <Portal>
      <Dialog visible={showRateDialog.show} onDismiss={closeDialog}>
        <Dialog.Title>Add Review</Dialog.Title>
        <Dialog.Content>
          <HelperText type="error" visible={!subject && errors}>
            * This field is required
          </HelperText>
          <TextInput
            label="Review Subject"
            onChangeText={(text) => {
              setSubject(text);
              text ? setErrors(false) : setErrors(true);
            }}
            value={subject}
            error={!subject && errors}
          />
          <HelperText type="error" visible={!comment && errors}>
            * This field is required
          </HelperText>
          <TextInput
            label="Comment"
            multiline
            onChangeText={(text) => {
              setComment(text);
              text ? setErrors(false) : setErrors(true);
            }}
            value={comment}
            error={!comment && errors}
          />
        </Dialog.Content>
        <Dialog.Content
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ marginBottom: 10 }}>Rating</Text>
          <StarRating
            enableHalfStar={false}
            rating={rating}
            onChange={setRating}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              agent.Reviews.postReview(
                {
                  Boat__c: item.Id,
                  Name: subject,
                  Comment__c: comment,
                  Rating__c: rating,
                },
                () => {
                  Snackbar.show({
                    text: "Review Posted Successfully!",
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: "green",
                  });
                }
              );
              closeDialog();
            }}
            mode="contained"
            disabled={errors || !subject || !comment || !rating}
          >
            Send Review
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default RateModal;
