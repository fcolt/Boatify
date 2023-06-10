import React, { useState, useEffect } from "react";
import { View } from "react-native";
import SoundPlayer from "react-native-sound-player";
import Slider from "@react-native-community/slider";
import { IconButton } from "react-native-paper";
import Snackbar from "react-native-snackbar";

interface SoundPlayerComponentProps {
  audioFilename: string;
}

const SoundPlayerComponent = ({ audioFilename }: SoundPlayerComponentProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const getInfo = async () => {
    try {
      const info = await SoundPlayer.getInfo();
      setDuration(info.duration);
      setCurrentTime(info.currentTime);
    } catch (err) {
      Snackbar.show({
        text: "Could not retrieve sound info",
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: "red",
      });
    }
  };

  useEffect(() => {
    SoundPlayer.addEventListener("FinishedPlaying", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
    const interval = setInterval(() => {
      if (isPlaying) {
        SoundPlayer.getInfo().then((info) => {
          setCurrentTime(info.currentTime);
        });
      }
    }, 0);
    if (isPlaying) {
      getInfo();
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  const togglePlayback = () => {
    if (isPlaying) {
      SoundPlayer.pause();
    } else {
      try {
        SoundPlayer.playSoundFile(audioFilename, "mp3");
      }
      catch (e) {
        Snackbar.show({
          text: "Could not play the sound",
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: "red",
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (value: number) => {
    setCurrentTime(value);
    SoundPlayer.seek(value);
  };

  return (
    <View>
      <Slider
        minimumValue={0}
        maximumValue={duration}
        value={currentTime}
        onValueChange={handleSliderChange}
        style={{ width: "100%" }}
      />

      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          mode="contained"
          style={{}}
          icon={isPlaying ? "pause" : "play"}
          onPress={togglePlayback}
        />
      </View>
    </View>
  );
};

export default SoundPlayerComponent;
