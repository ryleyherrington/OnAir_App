#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"tweet",@"name",@"de.marcelpociot.twitter",@"moduleid",@"1.2",@"version",@"08450466-1372-4846-84a7-2315835a78a2",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end
