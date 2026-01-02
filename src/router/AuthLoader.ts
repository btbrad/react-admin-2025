import { getPermissionListApi } from '@/api/user'
const AuthLoader = async () => {
  const data = await getPermissionListApi()
  return {
    buttonList: data.buttonList,
    menuList: data.menuList,
    menuPathList: []
  }
}

export default AuthLoader
