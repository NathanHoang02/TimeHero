export interface UserInfoDTO {
    id: string;
    completedTaskIDs: string[];
    accumulatedTime: number;   
    depositedTime: number;     
    leaderboardID: string | null;
    activeTaskIDs: string[];    
}
  