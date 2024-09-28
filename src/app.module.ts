import { Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule,Routes } from '@nestjs/core';
import { DealerProfileModule } from './Modules/Dealer/dealer_profile/dealer_profile.module';
import { dealerDetailsModule } from './Modules/Dealer/dealer_details/dealer_details.module';
import { dealerAuthModule } from './Modules/Dealer/dealer_auth/dealer_auth.module';
import {  DealerStrategy } from './strategies/jwt.strtegy';
import Dealer_Entity from './entities/dealer_detail.entity';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import DealerProducts from './entities/dealer_product.entity';
import { DealerProductsModule } from './Modules/Dealer/dealer_products/dealer_products.module';
import { OrderManagementModule } from './Modules/orders/order-management/order-management.module';
import { DealerQueriesModule } from './Modules/Dealer/dealer_queries/dealer_queries.module';
import { DealerPayoutModule } from './Modules/Dealer/dealer_payout/dealer_payout.module';
import { DealerOrderHistoryModule } from './Modules/Dealer/dealer_order_history/dealer_order_history.module';
import DealerMenu from './entities/dealer_product.entity';
import { OrderItemsModule } from './Modules/orders/order-items/order-items.module';
import { RatingModule } from './Modules/rating/rating.module';
import { OrderItem } from './entities/order-item.entity';
import OrderManagement from './entities/order-management.entity';
import { Rating } from './entities/rating.entity';
import { DealerRatingModule } from './Modules/Dealer/dealer_rating/dealer_rating.module';
import { ScheduleModule } from '@nestjs/schedule';
import { Category } from './entities/category.entity';
import { CategoryModule } from './Modules/Dealer/category/category.module';
import { ProductRatingModule } from './Modules/Dealer/product_rating/product_rating.module';
import { ProductRating } from './entities/product_rating.entity';
import { AdminInfoModule } from './Modules/Admin/admin_info/admin_info.module';
import { DealerComplientsModule } from './Modules/Dealer/dealer_complients/dealer_complients.module';
import { DealerManagestaffModule } from './Modules/Dealer/dealer_managestaff/dealer_managestaff.module';
import { DealerManagestaff } from './entities/dealer_managestaff.entity';
import { AdminInfo } from './entities/admin_info.entity';
import { AdminNotification } from './entities/admin_notification.entity';
import { AdminNotificationModule } from './Modules/Admin/admin_notification/admin_notification.module';
import { DealerNotificationModule } from './Modules/Dealer/dealer_notification/dealer_notification.module';
import { AdminComplientsModule } from './Modules/Admin/admin_complients/admin_complients.module';
import { DealerToAdminComplientsModule } from './Modules/Dealer/dealer_to-admin-complients/dealer_to-admin-complients.module';
import { DealerToAdminComplient } from './entities/dealer_to-admin-complient.entity';
import { ManageOutletModule } from './Modules/Dealer/manage-outlet/manage-outlet.module';
import { DealerSettingsModule } from './Modules/Dealer/dealer-settings/dealer-settings.module';
import DealerNotifications from './entities/dealer_Notifications.entity';
import { DealerStatusModule } from './Modules/Dealer/dealer_status/dealer_status.module';
import { ScheduleOrderManagementModule } from './Modules/Dealer/schedule_order-management/schedule_order-management.module';
import { ScheduleOrderManagement } from './entities/schedule_order-management.entity';
import { DealerScheduleOrderHistoryModule } from './Modules/Dealer/dealer_schedule-order-history/dealer_schedule-order-history.module';
import { ScheduleOrderPayoutModule } from './Modules/Dealer/schedule-order_payout/schedule-order_payout.module';
import { PromoOffers } from './entities/promo-offer.entity';
import { PromoOffersModule } from './Modules/Admin/promo-offers/promo-offers.module';
import { CustomerdetailModule } from './Modules/Customer/customerdetail/customerdetail.module';
import { CustomerauthModule } from './Modules/Customer/customerauth/customerauth.module';
import { MulterModule } from '@nestjs/platform-express';
import { RestaurantSlotTimingModule } from './Modules/Dealer/restaurant_slot-timing/restaurant_slot-timing.module';
import { RestaurantSlotTiming } from './entities/restaurant_slot-timing.entity';
import Payment from './entities/payment.entity';
import { CustomerfilterModule } from './Modules/Customer/customerfilter/customerfilter.module';
import { User } from './entities/customer_detail.entity';
import { PaymentModule } from './Modules/payment/payment.module';
import { UserOrderHistoryModule } from './Modules/Customer/user_order_history/user_order_history.module';
import { DealerOrderNotificationModule } from './Modules/Dealer/dealer_order_notification/dealer_order_notification.module';
import { ScheduleServiceService } from './services/schedule-service.service';
import { AgentModule } from './Modules/delivery_agent/agent/agent.module';
import { Agent } from './entities/agent.entity';
import { CustomerOrderModule } from './Modules/Customer/customer_order/customer_order.module';
import { AgentOrdernotificationModule } from './Modules/delivery_agent/agent_ordernotification/agent_ordernotification.module';
import { AgentauthModule } from './Modules/delivery_agent/agentauth/agentauth.module';
import { CustomerRatingModule } from './Modules/Customer/customer_rating/customer_rating.module';
import { ProductsIngredientsModule } from './Modules/Dealer/products_ingredients/products_ingredients.module';
import { ProductTagsModule } from './Modules/Dealer/product_tags/product_tags.module';
import { ProductTag } from './entities/product_tag.entity';
import { ProductsIngredient } from './entities/products_ingredient.entity';
import { ProductAddOn } from './entities/product_add-on.entity';
import { MiddlewareConsumer, NestModule, RouteInfo } from '@nestjs/common/interfaces';
import { RawBodyMiddleware } from './middlewares/RawBodyMiddleware';
import { JsonBodyMiddleware } from './middlewares/JsonBodyMiddleware';
import { NotificationsModule } from './Modules/notifications/notifications.module';
import { ProductCustomizationModule } from './Modules/Dealer/product_customization/product_customization.module';
import { ProductCustomization } from './entities/product_customization.entity';
import { ProductAddOnsModule } from './Modules/Dealer/product_add-ons/product_add-ons.module';
import { DealerProductsfilterModule } from './Modules/Dealer/dealer_productsfilter/dealer_productsfilter.module';


const rawBodyParsingRoutes: Array<RouteInfo> = [
  {
    path: '*my/rawbody/required/route*',
    method: RequestMethod.POST,
  },
]
const routes:Routes=[
 {
path:'customer',
children:[{
      path:'auth',
      module:CustomerauthModule,

    },
  {
    path:'user-info',
    module:CustomerdetailModule
  },
  {
    path:'payment',
    module:PaymentModule
  
  },
 {
    path:'filters',
    module:CustomerfilterModule
  },
  {
    path:'order-history',
    module:UserOrderHistoryModule
  },
  {
    path:'orders',
    module:CustomerOrderModule
  },
  {
    path:'ratings',
    module:CustomerRatingModule
  },


],},
  {
path:'dealer',
children:[
    
    {
      path:'auth',
      module:dealerAuthModule,
    },
    {
      path:'profile',
      module:DealerProfileModule,
    }
    ,{
      path:'products',
      module:DealerProductsModule
    },
    {
      path:'addOn',
      module:ProductAddOnsModule
    },
    {
      path:'ingredients',
      module:ProductsIngredientsModule
    },
    {
      path:'foodtags',
      module:ProductTagsModule
    },
    {
      path:'add-customization',
      module:ProductCustomizationModule
    },
    
    {
      path:'category',
      module:CategoryModule
    },
    {
    path:'product-filter',
    module:DealerProductsfilterModule
    },
  
    {
      path:'order-history',
      module:DealerOrderHistoryModule
    },{
      path:'scheduleOrder',
      module:ScheduleOrderManagementModule,
      },

      {
        path:'scheduleOrderHistory',
        module:DealerScheduleOrderHistoryModule,
      },

    {
      path:'payout',
      module:DealerPayoutModule
  
    },
    {
      path:'rating',
      module:DealerRatingModule
  
    },
    {
      path:'product-rating',
      module:ProductRatingModule
    },
    {
      path:'queries',
      module:DealerQueriesModule,
    },

    {
      path:'details-info',
      module:dealerDetailsModule,
    },
    {
      path:'Notification',
      module:DealerNotificationModule,

    },
    {
    path:'complients',
    module:DealerComplientsModule,
    },
    {
      path:'manage-outlet',
      module:ManageOutletModule
    },{
      path:'scheduleOrder-payout',
      module:ScheduleOrderPayoutModule
    }
,
    {
      path:'manage-staff',
      module:DealerManagestaffModule
    }, {
      path:"dealercomplients",
      module:DealerToAdminComplientsModule
    },
    {
      path:"settings",
      module:DealerSettingsModule
    },
    {
      path:"status",
      module:DealerStatusModule
    },{
      path:"slotTiming",
      module:RestaurantSlotTimingModule
    },{
      path:"orderNotification",
      module:DealerOrderNotificationModule
    }

      ],
    }, 
    {
      path:"agent",

      children:[{
      path:"agent-info",
      module:AgentModule
    },
    {
       path:"agent-auth",
       module:AgentauthModule
    },
    {
      path:"agent-notification",
      module:AgentOrdernotificationModule
    }]
    },
    {
  path:"admin",
  children:[
    {
      path:"admin-info",
      module:AdminInfoModule
    },
    {
      path:"order",
      module:OrderManagementModule,
    },
    
    {
      path:'rating',
      module:RatingModule

    },

    {
      path:"notification",
      module:AdminNotificationModule
    }
    ,{
    path:"complients",
    module:AdminComplientsModule
    },
    {
      path:"promooffers",
      module:PromoOffersModule
    }
  ]
}

  

  
]

@Module({
  imports: [ScheduleModule.forRoot(),ConfigModule.forRoot({
    isGlobal:true,
  }),
  MulterModule.register({
dest:"/home/aiimtech05/projects/officework-multiauth/officework/assets/images",
  
  }),
  TypeOrmModule.forRoot({
    type:'postgres',
    host:process.env.DB_HOST,
    port:parseInt(process.env.DB_PORT),
    database:process.env.DB_NAME,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    synchronize:true,
    entities:[Dealer_Entity,
      AdminInfo,
      DealerMenu,OrderItem,OrderManagement,
      Rating,ProductRating,Category,
      DealerManagestaff,
      AdminNotification,DealerToAdminComplient,
      DealerNotifications,
      ScheduleOrderManagement,PromoOffers,RestaurantSlotTiming,
      Agent,  Rating,ProductRating,Category,DealerManagestaff,
      AdminNotification,DealerToAdminComplient,DealerNotifications,
      ScheduleOrderManagement,PromoOffers,Payment,User,ProductTag,
      ProductsIngredient,ProductAddOn,ProductCustomization,],    logging:true, 
    logger:'file',
  }),
  CustomerauthModule,
  CustomerdetailModule,
  CustomerOrderModule,
  UserOrderHistoryModule,
  PaymentModule,
  dealerAuthModule,
  dealerDetailsModule,
  DealerRatingModule,
  DealerProfileModule,
  DealerProductsModule,
  DealerProductsfilterModule,
  OrderManagementModule,
  OrderItemsModule,
  ProductRatingModule,
  RatingModule,
  DealerQueriesModule,
  DealerPayoutModule,
  DealerOrderHistoryModule,
  CategoryModule,
  AdminNotificationModule,
  DealerNotificationModule,
  DealerComplientsModule,
  DealerManagestaffModule,
  AdminInfoModule,
  AdminComplientsModule,
  DealerToAdminComplientsModule,
  ManageOutletModule,
  DealerSettingsModule,
  DealerStatusModule,
  ScheduleOrderManagementModule,
  DealerScheduleOrderHistoryModule,
  ScheduleOrderPayoutModule,
  PromoOffersModule,
  RestaurantSlotTimingModule,
  CustomerfilterModule,
  AgentModule,
  AgentOrdernotificationModule,
  AgentauthModule,
  CustomerRatingModule,
  ProductsIngredientsModule,
  ProductTagsModule,
  NotificationsModule,
  ProductCustomizationModule,

  
RouterModule.register(routes),
  
ScheduleOrderManagementModule,

],
 providers:[
  DealerStrategy,ConfigService,AppService, ScheduleServiceService],
 controllers:[AppController]
 
})

export class AppModule  {}