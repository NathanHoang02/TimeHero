import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  View,
  Button,
  Modal,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";

import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import Leaderboard from "@/components/PageModules/LeaderboardPage/leaderboard";
import { JoinCodeInput } from "@/components/PageModules/LeaderboardPage/JoinCodeInput";
import { GenerateCodeSection } from "@/components/PageModules/LeaderboardPage/GenerateCodeSection";
import { RootState, useAppDispatch } from "@/store/store";
import { fetchLeaderboard } from "@/store/leaderboardSlice";
import { useSelector } from "react-redux";
import { fetchUserInfo, joinLeaderboard } from "@/store/userSlice";

export default function LeaderboardScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  const dispatch = useAppDispatch();

  const $userLeaderboardId =
    useSelector((state: RootState) => state.user.userInfo?.leaderboardID) ??
    null;
  const $userId =
    useSelector((state: RootState) => state.user.userInfo?.id) ?? null;
  const $leaderboardUsers = useSelector(
    (state: RootState) => state.leaderboard.users
  );

  const $userAccumulatedTime =
    useSelector((state: RootState) => state.user.userInfo?.accumulatedTime) ??
    null;
  const handleJoinLeaderboard = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleJoin = () => {
    setModalVisible(false);

    const leaderboardTarget = {
      userId: $userId ?? "",
      leaderboardJoinCode: joinCode,
    };

    dispatch(joinLeaderboard(leaderboardTarget))
      .then(() => {
        dispatch(fetchUserInfo(leaderboardTarget.userId));
      })
      .then(() => {
        if ($userLeaderboardId) dispatch(fetchLeaderboard($userLeaderboardId));
      });
  };

  const handleGenerateCode = () => {
    const newCode = Math.random().toString(36).substr(2, 6).toUpperCase();

    const leaderboardTarget = {
      userId: $userId ?? "",
      leaderboardJoinCode: newCode,
    };

    dispatch(joinLeaderboard(leaderboardTarget))
      .then(() => {
        dispatch(fetchUserInfo(leaderboardTarget.userId));
      })
      .then(() => {
        if ($userLeaderboardId) dispatch(fetchLeaderboard($userLeaderboardId));
      });
  };

  type Player = {
    id: string;
    name: string;
    score: number;
  };

  const playersOnLeaderboard: Player[] = useMemo(() => {
    return $leaderboardUsers.map((user) => {
      return {
        id: user.id,
        name: user.username ?? "test",
        score: user.accumulatedTime / 1000,
      };
    });
  }, [$leaderboardUsers]);

  useEffect(() => {
    if ($userLeaderboardId) {
      dispatch(fetchLeaderboard($userLeaderboardId));
    }
  }, [$userLeaderboardId]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Ionicons size={310} name="trophy" style={styles.headerImage} />
      }
    >
      <Leaderboard players={playersOnLeaderboard} />
      <View style={styles.buttonContainer}>
        <Button title="Join Leaderboard" onPress={handleJoinLeaderboard} />
      </View>

      {/* Modal for "Join Leaderboard" */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {/* "X" Close Button */}
            <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
              <Ionicons name="close" size={scaledSize(24)} color="#333" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Join the Leaderboard</Text>

            {/* Row container for "Enter Join Code" and "Generate Join Code" sections */}
            <View style={styles.rowContainer}>
              <JoinCodeInput
                joinCode={joinCode}
                onJoinCodeChange={setJoinCode}
                onJoinPress={handleJoin}
              />
              <View style={styles.verticalDivider} />
              <GenerateCodeSection onGeneratePress={handleGenerateCode} />
            </View>
          </View>
        </View>
      </Modal>
    </ParallaxScrollView>
  );
}

const { width } = Dimensions.get("window");
const scale = width / 375;
const scaledSize = (size: number) => size * scale;

const styles = StyleSheet.create({
  title: {
    fontSize: scaledSize(40),
    fontWeight: "bold",
    color: "#c70a29",
    textAlign: "center",
    marginBottom: scaledSize(16),
  },
  headerImage: {
    color: "#FFFF00",
    bottom: -scaledSize(90),
    left: -scaledSize(35),
    position: "absolute",
  },
  buttonContainer: {
    padding: scaledSize(16),
    marginTop: scaledSize(20),
    alignSelf: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: scaledSize(20),
    borderRadius: 10,
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    top: scaledSize(10),
    right: scaledSize(10),
  },
  modalTitle: {
    fontSize: scaledSize(20),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: scaledSize(20),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  verticalDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#ccc",
    marginHorizontal: scaledSize(10),
  },
});
