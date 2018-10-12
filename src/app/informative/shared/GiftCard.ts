
export interface GiftCard{
            iCardNumber: number;  
            iSeriesId: number  
            iBatchId: number;  
            sDescription: string;  
            cValue: number;  
            cInitValue: number;  
            iStatus: number;  
            dtStart: string;  
            dtEnd: string;  
            cTotalMoneyLoad: number;  
            cTotalMoneyOut: number;  
            iTotalTraffic: number;  
             dtUpdate: string;  
            iUpdateBy: number;  
            bVoucher: boolean;  
            iLocation?: number;  
            dCustomerId?: number;  
            sMemberNo?: number;  
            iClubId?: number;  
            dtCreate: string;  
            iCreateBy?: number;  
}