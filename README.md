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

   `git clone https://github.com/TranAnh022/fs17-Frontend-project`

   Then, install all the dependencies:

   `npm install`

   Start the project with:

   `npm start`

   Run testing using command:

   `npm run test`

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

![image](https://github.com/TranAnh022/fs17-Frontend-project/assets/63698770/800471a9-c094-463b-8bb4-9d52b13add3b)

![image](https://github.com/TranAnh022/fs17-Frontend-project/assets/63698770/a95c2850-d4ce-4542-9186-bd806af44609)

![image](https://github.com/TranAnh022/fs17-Frontend-project/assets/63698770/f3c0f793-7ca6-428f-bfba-312731ac15e9)

![image](https://github.com/TranAnh022/fs17-Frontend-project/assets/63698770/bb520605-b569-458b-be14-d2e86223187a)

![image](https://github.com/TranAnh022/fs17-Frontend-project/assets/63698770/5f261429-1cc8-4c81-8a3d-d48bf2578e16)

![image](https://github.com/TranAnh022/fs17-Frontend-project/assets/63698770/8459640d-35a9-44b6-a0bf-e2435e28e4b7)





