#include "panel/CommonBox.h"
#include "panel/SIScrollBox.h"
#include "panel/CommonBoxSlot.h" 
#include "Blueprint/WidgetBlueprintLibrary.h"

// q1 SetClipping?
// q2 WITH_EDITOR宏？ 
// q3 CastChecked？

UCommonBox::UCommonBox(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)
	, Orientation(Orient_Vertical)
{
	bIsVariable = true;
	SetVisibilityInternal(ESlateVisibility::Visible);
	SetClipping(EWidgetClipping::ClipToBounds);
}


void UCommonBox::SetOrientation(EOrientation NewOrientation)
{
	Orientation = NewOrientation;
	if (MyScrollBox.IsValid())
	{
		MyScrollBox->SetOrientation(NewOrientation);
	}
}

void UCommonBox::SynchronizeProperties()
{
	Super::SynchronizeProperties();
	if (!MyScrollBox.IsValid())
	{
		return;
	}
	// 同步属性
	MyScrollBox->SetOrientation(Orientation);
	MyScrollBox->SetSlotSpacing(InnerSlotPadding);
	MyScrollBox->SetContentPadding(ContentPadding);
	const UWorld* World = GetWorld();
	if (ShowNum != LastShowNum || ShowNum != GetChildrenCount())
	{
		ClearChildren();
		if (ChildWidgetClass && ShowNum > 0)
		{
			APlayerController* PlayerController = World->GetFirstPlayerController();
			for (int32 i = 0; i < ShowNum; ++i)
			{
				UWidget* ChildWidget = UWidgetBlueprintLibrary::Create(
					const_cast<UWorld*>(World),
					ChildWidgetClass,
					PlayerController
				);
				if (ChildWidget)
				{
					AddChild(ChildWidget);
				}
			}
		}
		LastShowNum = ShowNum;
	}
}

void UCommonBox::ReleaseSlateResources(bool bReleaseChildren)
{
	Super::ReleaseSlateResources(bReleaseChildren);
	MyScrollBox.Reset();
}

#if WITH_EDITOR
const FText UCommonBox::GetPaletteCategory()
{
	return Super::GetPaletteCategory();
}
#endif

TSharedRef<SWidget> UCommonBox::RebuildWidget()
{
	MyScrollBox = SNew(SIScrollBox)
		.Orientation(Orientation)
		.SlotSpacing(InnerSlotPadding)
		.ContentPadding(ContentPadding);
	
	// 构建已有的子控件
	for (UPanelSlot* PanelSlot : Slots)
	{
		if (UCommonBoxSlot* TypedSlot = Cast<UCommonBoxSlot>(PanelSlot))
		{
			TypedSlot->Parent = this;
			TypedSlot->BuildSlot(MyScrollBox.ToSharedRef());
		}
	}
	return MyScrollBox.ToSharedRef();
}

UClass* UCommonBox::GetSlotClass() const
{
	// 在RebuildWidget中指定slot类型
	return UCommonBoxSlot::StaticClass();
}

void UCommonBox::OnSlotAdded(UPanelSlot* inSlot)
{
	if (MyScrollBox.IsValid())
	{
		CastChecked<UCommonBoxSlot>(inSlot)->BuildSlot(MyScrollBox.ToSharedRef());
	}
}

void UCommonBox::OnSlotRemoved(UPanelSlot* inSlot)
{
	if (MyScrollBox.IsValid() && inSlot->Content)
	{
		TSharedPtr<SWidget> Widget = inSlot->Content->GetCachedWidget();
		if (Widget.IsValid())
		{
			MyScrollBox->RemoveSlot(Widget.ToSharedRef());
		}
	}
}
