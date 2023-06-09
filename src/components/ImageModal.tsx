import React from "react";
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Share,
} from "react-native";
import { Portal, Modal, IconButton } from "react-native-paper";
import { PlaceholderJpg } from "../../assets";
import { useAuthContext } from "../context/AuthContext";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import Snackbar from "react-native-snackbar";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const PLACEHOLDER_MODAL_IMAGE = Image.resolveAssetSource(PlaceholderJpg).uri;

interface ImageModalProps {
  showImageModal: boolean;
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalPicture: string;
}

const ImageModal = ({
  showImageModal,
  setShowImageModal,
  modalPicture,
}: ImageModalProps) => {
  const { accessToken } = useAuthContext();
  return (
    <Portal>
      <Modal
        visible={showImageModal}
        onDismiss={() => setShowImageModal(false)}
        style={styles.modalContainer}
      >
        <TouchableWithoutFeedback onPress={() => setShowImageModal(false)}>
          <View style={styles.modalContainer}>
            <ReactNativeZoomableView onSingleTap={() => setShowImageModal(false)}>
              <Image
                style={styles.image}
                defaultSource={{ uri: PLACEHOLDER_MODAL_IMAGE }}
                source={{
                  uri: modalPicture,
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }}
              />
            </ReactNativeZoomableView>
            <IconButton
              icon="share"
              iconColor="white"
              size={40}
              onPress={async () => {
                try {
                  Share.share({
                    message: modalPicture,
                    url: modalPicture,
                    title: modalPicture,
                  });
                } catch (err: any) {
                  Snackbar.show({
                    text: 'An error occured while sharing...',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'red'
                  })
                }
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  image: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.75,
    resizeMode: "contain",
  },
});

export default ImageModal;
