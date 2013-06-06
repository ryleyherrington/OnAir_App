/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"XvWG4HQhY6WQ9JxqNbvapkf3fcMNGoLy"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"gMYL8hpY3HD1TmLLaPcq6x9YDxgU8NPL"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"CIKCvy9I681qvsqfKh4GFap4cPAnzccF"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"WbpLLOXXO47WIZKthjvlJtuZYVUZA4Lo"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"pHaAiPTX4CJBlmOquni17VMSqMFxtKDE"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"C8qjkwl618GZLCmbMClzIkYUm294DqkK"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
