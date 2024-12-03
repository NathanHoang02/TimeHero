import React, { useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Header from "@/components/common/Header";
import MinifiedTasksScreen from "@/components/common/MinifiedTaskScreen";
import { RootState, useAppDispatch } from "@/store/store";
import { fetchAvailableTasks } from "@/store/taskSlice";
import { fetchCompletedTasks } from "@/store/userSlice";
import { useSelector } from "react-redux";

const HomeScreenContent = () => {
  const dispatch = useAppDispatch();
  const $userId = useSelector((state: RootState) => state.user.userInfo?.id);

  
  useEffect(() => {
    dispatch(fetchAvailableTasks());
    if ($userId) dispatch(fetchCompletedTasks($userId));
  }, [dispatch, $userId]);

  return (
    <View style={styles.container}>
      <Header renderQuickDashboard />
      <MinifiedTasksScreen />
    </View>
  );
};

export default HomeScreenContent;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: height * 0.01,
    backgroundColor: "#f5f5f5",
  },
});
