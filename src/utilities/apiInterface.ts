export interface IGrantTokenBody{
    grant_type: string
    client_id: string
    client_secret: string
    resource: string
}

export interface IGrantTokenResult{
    token_type: string,
    expires_in: string,
    ext_expires_in: string,
    expires_on: string,
    not_before: string,
    resource: string,
    access_token: string,
    success:boolean,
    message:string,
    statusCode:number
}

export interface ICategory{
    categoryList:string[],
    catalog:ICategoryDetail[],
    success: boolean,
    message: string,
    statusCode: number
}

export interface ICategoryDetail{
    brandId: string,
    brandName: string,
    brandTC: string,
    brandDisclaimer: null,
    brandRedemptionInstruction: string,
    brandDescription: string,
    products:IProduct[] ,
    recommendedValues: any,
    brandImage: string,
    denominationType: number,
    denominationMin: number,
    denominationMax: number,
    canSendToFriend: boolean,
    canSelfGifting: boolean,
    canSwych: boolean,
    canRedeem: boolean,
    canRegift: boolean,
    canCashout: boolean,
    categories: number[],
    countryCode: string,
    currency: string,
    currencySymbol: string,
    claimURL: string,
    availability: number,
    giftcardType: number
}

export interface IProduct{
    productId: string,
    productName: string,
    productType: number,
    amount: number,
    minimumAmount: number,
    maximumAmount: number
}

export interface IOrderDetail{
    accountId: string,
    brandId: string, 
    productId: string,
    amount: number,
    senderFirstName: string,
    senderLastName: string,
    senderEmail: string,
    senderPhone: string,
    recipientFirstName: string,
    recipientLastName: string,
    recipientEmail: string,
    recipientPhoneNumber: string,
    notificationDeliveryMethod: number,
    giftDeliveryMode: number,
    swychable: boolean,
    message: string,
    imageURL: string,
    deliverGiftTo: number
}

export interface IOrderInfo{
    orderId:string,
    success:boolean,
    message:string,
    statusCode:number,
    AccessCode: string,
}

export interface ITransactionDetail{
    transaction:ITransactionInfo[],
    balance: number,
    success: boolean
    message: string
    statusCode: number
}

export interface ITransactionInfo{
    transactionId: string,
    parentTransactionId: string,
    transactionDate: string,
    redeemOrSaveDate: string,
    transactionType: number,
    amount: string,
    exchangeRate: 1.0,
    recipientPhoneNumber: string,
    recipientEmail: string,
    recipientName: string,
    recipientSwychId: string,
    status: number,
    brand: IBrandDetail,
    payments: number,
    messageFromSender: IMessageFromSender,
    senderPhoneNumber: string,
    senderEmail: string,
    senderName: string,
    senderSwychId: string,
    statusDisplay: string,
    previousPaymentType: number,
    orderId: string,
    showAttachment: boolean,
    foreignCurrency: string,
    foreignAmount: string,
    DeliveryType: number,
    countryCode: number,
    claimURL: string,
}

export interface ITransactionInfos{
    transactions:ITransactionInfo[]
    success: boolean,
    message: string,
    statusCode: number
}

export interface IProductDetail{
    productId: string,
    productName: string,
    productType: number,
    amount: number,
    minimumAmount: number,
    maximumAmount: number
}

export interface IBrandDetail{
    brandId: string,
    brandName: string,
    brandTC: string,
    brandDisclaimer: null,
    brandRedemptionInstruction: string,
    brandDescription: string,
    products: IProductDetail[],
    recommendedValues: null,
    brandImage: string,
    denominationType: 1,
    denominationMin: 10.0,
    denominationMax: 300.0,
    canSendToFriend: true,
    canSelfGifting: true,
    canSwych: true,
    canRedeem: true,
    canRegift: false,
    canCashout: false,
    categories: number[],
    countryCode: string,
    currency: string,
    currencySymbol: string,
    claimURL: string,
    availability: number,
    giftcardType: number
}

export interface IMessageFromSender{
    message: string,
    imageUrl: string,
    videoUr: string
}

export interface IBalance{
    balance: number,
    availableBalance: number,
    success: boolean,
    message: string,
    statusCode: number
}

export interface ILogIn{
    clientId: string,
    apiKey: string,
    accountId: string,
    token_type: string,
    expires_in: string,
    ext_expires_in: string,
    expires_on: string,
    not_before: string,
    resource: string,
    access_token: string,
    success: boolean,
    message: string,
    statusCode: number
}