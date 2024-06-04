# Introduction

This project is a final assignment for the front-end module at Integrify, showcasing the development of a basic e-commerce application. Built using React and Material-UI (MUI), the application interacts with a backend API for data management, enabling users to create, read, update, and delete data.

The application features a robust authentication system with role-based access control. Basic users can explore and interact with products by filtering, searching, sorting, and adding or removing items from their cart. Additionally, they can write reviews, place orders, and make payments via Stripe.

Administrators have access to a dedicated dashboard where they can perform CRUD (Create, Read, Update, Delete) operations on products, manage user data, and oversee orders. This ensures that both users and admins can efficiently interact with and manage the system.

Check out the website [here](https://fs17-frontend-project.onrender.com/)

NOTE: This repository only contains the frontend of the application. The backend can be found [here](https://github.com/TranAnh022/fs17_CSharp_FullStack)

### Prerequisites:
- React
- Redux
- MUI
- Typescript
- Unit Testing

### Installation:
   Clone the repo:
```
   git clone https://github.com/TranAnh022/fs17-Frontend-project
```
   Then, install all the dependencies:
```
   npm install
```
   Start the project with:
```
   npm start
```
   Run testing using command:
```
   npm run test
```
### Project Structure
   - [App.tsx](App.tsx)
   - [README.md](README.md)
   - __components__
     - __about__
       - [About.tsx](components/about/About.tsx)
     - __banner__
       - [About.tsx](components/banner/About.tsx)
     - __cart__
       - [CartSum.tsx](components/cart/CartSum.tsx)
       - [CartTable.tsx](components/cart/CartTable.tsx)
     - __contextAPI__
       - [ThemeColorProvider.tsx.tsx](components/contextAPI/ThemeColorProvider.tsx.tsx)
     - __filter__
       - [FilterForm.tsx](components/filter/FilterForm.tsx)
     - __footer__
       - [index.tsx](components/footer/index.tsx)
     - __googleLogin__
       - [GoogleLogin.tsx](components/googleLogin/GoogleLogin.tsx)
     - __header__
       - [Header.tsx](components/header/Header.tsx)
       - [HeaderDrawer.tsx](components/header/HeaderDrawer.tsx)
       - [HeaderDropDown.tsx](components/header/HeaderDropDown.tsx)
     - __imagesList__
       - [ImageCarousel.tsx](components/imagesList/ImageCarousel.tsx)
       - [ImageList.tsx](components/imagesList/ImageList.tsx)
     - __loading__
       - [LoadingComponent.tsx](components/loading/LoadingComponent.tsx)
     - __newLetter__
       - [index.tsx](components/newLetter/index.tsx)
     - __notFound__
       - [NotFound.tsx](components/notFound/NotFound.tsx)
     - __products__
       - [NewArrival.tsx](components/products/NewArrival.tsx)
       - [ProductCard.tsx](components/products/ProductCard.tsx)
       - [Products.tsx](components/products/Products.tsx)
   - __customizedCSS__
     - [index.tsx](customizedCSS/index.tsx)
   - [index.css](index.css)
   - [index.tsx](index.tsx)
   - __pages__
     - [CartPage.tsx](pages/CartPage.tsx)
     - [HomePage.tsx](pages/HomePage.tsx)
     - [LoginPage.tsx](pages/LoginPage.tsx)
     - [ProductCreate.tsx](pages/ProductCreate.tsx)
     - [ProductDetails.tsx](pages/ProductDetails.tsx)
     - [ProductUpdate.tsx](pages/ProductUpdate.tsx)
     - [Profile.tsx](pages/Profile.tsx)
     - [RegisterPage.tsx](pages/RegisterPage.tsx)
   - [react\-app\-env.d.ts](react-app-env.d.ts)
   - __redux__
     - __actions__
       - [productActions.ts](redux/actions/productActions.ts)
       - [userActions.ts](redux/actions/userActions.ts)
     - [configureStore.ts](redux/configureStore.ts)
     - __slices__
       - [cartSlice.ts](redux/slices/cartSlice.ts)
       - [productSlice.ts](redux/slices/productSlice.ts)
       - [userSlice.ts](redux/slices/userSlice.ts)
   - [reportWebVitals.ts](reportWebVitals.ts)
   - __router__
     - [RequireAuth.tsx](router/RequireAuth.tsx)
     - [Routes.tsx](router/Routes.tsx)
   - [setupTests.ts](setupTests.ts)
   - __test__
     - [Cart.test.ts](test/Cart.test.ts)
     - [Products.test.ts](test/Products.test.ts)
     - [Users.test.ts](test/Users.test.ts)
     - __shared__
       - [productServer.ts](test/shared/productServer.ts)
       - [userServer.ts](test/shared/userServer.ts)
   - __types__
     - [type.tsx](types/type.tsx)
   - [utils.ts](utils.ts)
   - [validation.ts](validation.ts)



## Picture Demo

![image](https://github.com/TranAnh022/fs17-Frontend-project/assets/63698770/02d25385-63e2-4c44-b178-170c78f60af4)

![image](https://github.com/TranAnh022/fs17-Frontend-project/assets/63698770/014015c5-6513-4c2e-839e-3c608b1e2e38)

![image](https://github.com/TranAnh022/fs17-Frontend-project/assets/63698770/973973f7-9d56-4380-a278-11ad3aed7965)

![image](https://github.com/TranAnh022/fs17-Frontend-project/assets/63698770/aac16fdf-f0b1-4b62-b0c4-c80bfbdab22c)

![image](https://github.com/TranAnh022/fs17-Frontend-project/assets/63698770/e60ef68e-96f8-44b3-9288-084d40651ca5)

![image](https://github.com/TranAnh022/fs17-Frontend-project/assets/63698770/6bebf6fb-78b8-4e21-8d6d-c0f665929f08)

![image](https://github.com/TranAnh022/fs17-Frontend-project/assets/63698770/5dc28e0d-369e-4394-a6a7-a412fb83f41b)

![image](https://github.com/TranAnh022/fs17-Frontend-project/assets/63698770/1d7e00e3-c3d8-4c63-9a56-72e425a31f10)

![image](https://github.com/TranAnh022/fs17-Frontend-project/assets/63698770/4de044f8-36e6-487c-b647-b19aeede0346)






