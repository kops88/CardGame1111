#include "panel/SCommonBox.h"
#include "Widgets/Layout/SBox.h"
#include "Widgets/Text//STextBlock.h"
void SCommonBox::Construct(const FArguments& InArgs)
{
	Orientation = InArgs._Orientation;
	
	ChildSlot
	[
		SNew(SBox)
		.WidthOverride(400.f).HeightOverride(300.f)
		[
			SNew(STextBlock).Text(FText::FromString(TEXT("ABCDEFG.....")))
		]
	];
	
}

void SCommonBox::SetOrientation(EOrientation InOrientation)
{
	Orientation = InOrientation;
}
