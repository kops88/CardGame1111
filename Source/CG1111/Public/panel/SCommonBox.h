#pragma once

#include "CoreMinimal.h"
#include "Widgets/SCompoundWidget.h"

class SCommonBox : public SCompoundWidget
{
	SLATE_BEGIN_ARGS(SCommonBox)
		: _Orientation(Orient_Vertical){}

		SLATE_ARGUMENT(EOrientation, Orientation)
	SLATE_END_ARGS()

	
public:
	void Construct(const FArguments& InArgs);
	void SetOrientation(EOrientation InOrientation);
	
private:
	EOrientation Orientation;
};
