import User from "../models/User.model"
const AccessandRefreshToken = async (
  userId: string
): Promise<{ accesstoken: string; refreshtoken: string }> => {
  try {
    const user = await User.findById(userId);

    const accesstoken =  user.AccessToken();
    const refreshtoken =  user.RefreshToken();
    user.refreshToken = refreshtoken;
    await user.save();
    return { accesstoken, refreshtoken };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default AccessandRefreshToken