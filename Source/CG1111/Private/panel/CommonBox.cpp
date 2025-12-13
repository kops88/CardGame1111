
#include "panel//CommonBox.h"
#include "panel/SCommonBox.h"


UCommonBox::UCommonBox(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)
	, Orientation(Orient_Vertical)
{
	bIsVariable = true;
	SetVisibilityInternal(ESlateVisibility::Visible);
}

TSharedRef<SWidget> UCommonBox::RebuildWidget()
{
	mBox = SNew(SCommonBox).Orientation(Orientation);
	return mBox.ToSharedRef();
}

void UCommonBox::SynchronizeProperties()
{
	Super::SynchronizeProperties();
	
	if (mBox.IsValid())
	{
		 mBox->SetOrientation(Orientation);
	}
}

void UCommonBox::ReleaseSlateResources(bool bReleaseChildren)
{
	Super::ReleaseSlateResources(bReleaseChildren);
	mBox.Reset();
}

UClass* UCommonBox::GetSlotClass() const
{
	return UPanelSlot::StaticClass();
}

void UCommonBox::OnSlotAdded(UPanelSlot* InSlot)
{
	//Super::OnSlotAdded(InSlot);
}

void UCommonBox::OnSlotRemoved(UPanelSlot* InSlot)
{
	//Super::OnSlotRemoved(InSlot);
}

void UCommonBox::SetOrientation(EOrientation newOrientation)
{
	Orientation = newOrientation;
	if (mBox.IsValid())
	{
		mBox->SetOrientation(newOrientation);
	}
}
