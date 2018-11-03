import { DrawerNavigator , createStackNavigator } from 'react-navigation';

import Settings from '../scenes/Settings';
import Home from '../scenes/Home';
import SideMenu from './side-menu';
import CustomHeader from '../container/header';
import Category from '../scenes/Category/index';
import CategoryDetail from '../scenes/CategoryDetail';

const stackApp = createStackNavigator({
    HomeScreen:{  screen: Home },
    CategoryScreen:{  screen: Category },
    CategoryDetailScreen:{  screen: CategoryDetail },
    CustomHeaderScreen:{  screen: CustomHeader },
},{
    initialRouteName: 'CategoryScreen'
})

const stackSettings = createStackNavigator({
    SettingsScreen:{  screen: Settings },
})

export const Nav = DrawerNavigator({
    AppScreen:{  screen: stackApp },
    SettingsScreen:{  screen: stackSettings },
},{
    contentComponent: SideMenu
});