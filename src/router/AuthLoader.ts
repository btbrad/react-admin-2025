import { getPermissionListApi } from '@/api/user'
import { getMenuPath } from '@/utils'
const AuthLoader = async () => {
  const data = await getPermissionListApi()
  const menuPathList = getMenuPath(data.menuList)
  return {
    buttonList: data.buttonList,
    menuList: data.menuList,
    menuPathList
  }
}

export default AuthLoader
