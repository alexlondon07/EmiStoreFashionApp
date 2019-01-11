import { DrawerNavigator , createStackNavigator } from 'react-navigation';

import Settings from '../scenes/Settings';
import Home from '../scenes/Home';
import SideMenu from './side-menu';
import CustomHeader from '../container/header';
import Category from '../scenes/Category/index';
import CategoryForm from '../scenes/Category/components/category-form';
import Client from '../scenes/Client';
import ClientForm from '../scenes/Client/components/client-form';
import Product from '../scenes/Product';
import ProductForm from '../scenes/Product/components/product-form';

const stackApp = createStackNavigator({
    HomeScreen:{  screen: Home },
    CategoryScreen:{  screen: Category },
    ClientScreen: { screen: Client },
    CategoryFormScreen:{  screen: CategoryForm },
    ClientFormScreen:{  screen: ClientForm },
    CustomHeaderScreen:{  screen: CustomHeader },
    ProductScreen:{  screen: Product },
    ProductFormScreen:{  screen: ProductForm },
},{
    initialRouteName: 'HomeScreen',
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