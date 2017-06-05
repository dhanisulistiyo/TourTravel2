import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
//pages
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
//HomeScreen
import { HomePage } from '../pages/home/home';
import { CustomePackagePage } from '../pages/custome-package/custome-package';
import { FixedPackagePage } from '../pages/fixed-package/fixed-package';
import { PromoPackagePage } from '../pages/promo-package/promo-package';
//Details Profile
import { Myprofile } from '../pages/myprofile/myprofile';
import { Mycompany } from '../pages/mycompany/mycompany';
//My Bookings
import { MybookingPage } from '../pages/mybooking/mybooking';
import { MybookingOnPage } from '../pages/mybooking-on/mybooking-on';
import { MybookingComPage } from '../pages/mybooking-com/mybooking-com';
//IteneraryBuilder
import { IteneraryBuilderPage } from '../pages/itenerary-builder/itenerary-builder';
import { DestinationPage } from '../pages/destination/destination';
import { DestinationPage1 } from '../pages/destination1/destination1';
//hotel
import { ListHotelPage } from '../pages/list-hotel/list-hotel';
import { FilterHotelPage } from '../pages/filter-hotel/filter-hotel';
import { HotelRoomtypePage } from '../pages/hotel-roomtype/hotel-roomtype';
import { HotelRoomallocatePage } from '../pages/hotel-roomallocate/hotel-roomallocate';
import { HotelRoomservicePage } from '../pages/hotel-roomservice/hotel-roomservice';
//transport
import { ListTransportPage } from '../pages/list-transport/list-transport';
import { FilterTransportPage } from '../pages/filter-transport/filter-transport';
import { TransportAirportservicePage } from '../pages/transport-airportservice/transport-airportservice';
//Attraction
import { ListAttractionPage } from '../pages/list-attraction/list-attraction';
//Guest
import { InputTravellersPage } from '../pages/input-travellers/input-travellers';
//Filter Without Button
import { FilterTransport2Page } from '../pages/filter-transport2/filter-transport2';
import { FilterHotel2Page } from '../pages/filter-hotel2/filter-hotel2';
//Daily Page
import { DestinationPage2 } from '../pages/daily-page/destination2/destination2';
import { ListAttractionPage1 } from '../pages/daily-page/list-attraction1/list-attraction1';
import { FilterTransport1Page } from '../pages/daily-page/filter-transport1/filter-transport1';
import { ListTransportPage1 } from '../pages/daily-page/list-transport1/list-transport1';
import { TransportAirportservice1Page } from '../pages/daily-page/transport-airportservice1/transport-airportservice1';
import { FilterHotel1Page } from '../pages/daily-page/filter-hotel1/filter-hotel1';
import { ListHotelPage1 } from '../pages/daily-page/list-hotel1/list-hotel1';
import { HotelRoomtypePage1 } from '../pages/daily-page/hotel-roomtype1/hotel-roomtype1';
import { HotelRoomservicePage1 } from '../pages/daily-page/hotel-roomservice1/hotel-roomservice1';
import { HotelRoomallocatePage1 } from '../pages/daily-page/hotel-roomallocate1/hotel-roomallocate1';

//result
import { DailyProgram } from '../pages/daily-program/daily-program';
import { DailyDetails } from '../pages/daily-details/daily-details';
import { ConfirmBookingPage } from '../pages/confirm-booking/confirm-booking';
import { TourDetailsPage } from '../pages/tour-details/tour-details';
//component
import { LocationPopoverComponent } from '../components/location-popover/location-popover';
//Coba-coba
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { MovieListPage } from '../pages/movie-list/movie-list';


//service
import { AcomodationService } from '../providers/acomodation-service';
import { AttractionService } from '../providers/attraction-service';
import { AuthService } from '../providers/auth-token-service';
import { IteneraryService } from '../providers/itenerary-service';
import { FilacomodationService } from '../providers/filacomodation-service';
import { FiltransportService } from '../providers/filtransport-service';
import { LocationService } from '../providers/location-service';
import { TransportService } from '../providers/transport-service';
import { TransactionService } from '../providers/transaction-service';
import { HistoryService } from '../providers/history-service';
import { DailyService } from '../providers/daily-service';
import { MultiTransactionService } from '../providers/multi-transaction-service';
import { UserandcompanyDetails } from '../providers/userandcompany-details';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    MyApp,
    LoginPage,
    RegisterPage,
    //Home Screen
    HomePage,
    CustomePackagePage,
    PromoPackagePage,
    FixedPackagePage,
    //My Bookings
    MybookingPage,
    MybookingComPage,
    MybookingOnPage,

    //itinerarybuilder
    IteneraryBuilderPage,
    DestinationPage,
    DestinationPage1,
    ListHotelPage,
    HotelRoomallocatePage,
    HotelRoomtypePage,
    FilterHotelPage,
    HotelRoomservicePage,

    ListTransportPage,
    TransportAirportservicePage,
    ListAttractionPage,
    FilterTransportPage,
    InputTravellersPage,

    //filterManual
    FilterHotel2Page,
    FilterTransport2Page,
    //Daily Program
    DestinationPage2,
    ListAttractionPage1,
    FilterTransport1Page,
    ListTransportPage1,
    TransportAirportservice1Page,
    FilterHotel1Page,
    ListHotelPage1,
    HotelRoomtypePage1,
    HotelRoomservicePage1,
    HotelRoomallocatePage1,

    //result
    ConfirmBookingPage,
    DailyProgram,
    DailyDetails,
    TourDetailsPage,
    //component
    LocationPopoverComponent,

    //Details Profile
    Myprofile,
    Mycompany,

    ItemDetailsPage,
    ListPage,
    MovieListPage


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { tabsHideOnSubPages: "true" }),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    //apps
    LoginPage,
    RegisterPage,
    //Home Screen
    HomePage,
    CustomePackagePage,
    PromoPackagePage,
    FixedPackagePage,
    //My Booking
    MybookingPage,
    MybookingComPage,
    MybookingOnPage,

    //itineraryBuilder
    IteneraryBuilderPage,
    DestinationPage,
    DestinationPage1,
    ListHotelPage,
    HotelRoomallocatePage,
    HotelRoomtypePage,
    HotelRoomservicePage,

    ListTransportPage,
    TransportAirportservicePage,
    ListAttractionPage,
    FilterHotelPage,
    FilterTransportPage,
    InputTravellersPage,


    //filterManual
    FilterHotel2Page,
    FilterTransport2Page,

    //result
    ConfirmBookingPage,
    DailyProgram,
    DailyDetails,
    TourDetailsPage,

    //Daily Program
    DestinationPage2,
    ListAttractionPage1,
    FilterTransport1Page,
    ListTransportPage1,
    TransportAirportservice1Page,
    FilterHotel1Page,
    ListHotelPage1,
    HotelRoomtypePage1,
    HotelRoomservicePage1,
    HotelRoomallocatePage1,

    //component
    LocationPopoverComponent,

    //Details Profile
    Myprofile,
    Mycompany,

    ItemDetailsPage,
    ListPage,
    MovieListPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    IteneraryService,
    AcomodationService,
    AttractionService,
    TransportService,
    FilacomodationService,
    FiltransportService,
    LocationService,
    TransactionService,
    HistoryService,
    DailyService,
    MultiTransactionService,
    UserandcompanyDetails
  ]
})
export class AppModule { }
