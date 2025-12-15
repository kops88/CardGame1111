#pragma once
#include "CoreMinimal.h"
#include "Widgets/SPanel.h"

/**
 * 	布局容器 - 管理多个子控件的排列和布局
 */
class SInfiniteScrollPanel : public SPanel
{
	
public:
	class FSlot : public TBasicLayoutWidgetSlot<FSlot>
	{
	public:
		SLATE_SLOT_BEGIN_ARGS(FSlot, TBasicLayoutWidgetSlot<FSlot>)
		SLATE_SLOT_END_ARGS()
		
		FSlot()
			: TBasicLayoutWidgetSlot<FSlot>(HAlign_Fill, VAlign_Fill)
		{
			
		}
		
		void Construct(const FChildren& SlotOwner, FSlotArguments&& InArgs);
	};
	
	SLATE_BEGIN_ARGS(SInfiniteScrollPanel)
	{
		_Visibility = EVisibility::SelfHitTestInvisible;
	}
		SLATE_ARGUMENT(EOrientation, Orientation)
		SLATE_ARGUMENT(FVector2f, SlotSpacing)
		SLATE_ARGUMENT(FMargin, ContentPadding)
	SLATE_END_ARGS()
	
	SInfiniteScrollPanel()
		: Children(this)
	{
	}
	
	void Construct(const FArguments& InArgs, TArray<FSlot::FSlotArguments> InSlots = TArray<FSlot::FSlotArguments>());
public:
	
	TPanelChildren<FSlot> Children;
	EOrientation Orientation = Orient_Vertical;
	float PhysicalOffset = 0.0f;
	/** 间距 */
	FVector2f SlotSpacing;
	/** 内间距 */
	FMargin ContentPadding;
	
	void SetPhysicalOffset(float InOffset);
	
	/** 根据布局方式、slot信息，管理子控件的位置 */
	virtual void OnArrangeChildren(const FGeometry& AllottedGeometry, FArrangedChildren& ArrangedChildren) const override;
	/** 计算自身组件的位置 ？ */
	virtual FVector2D ComputeDesiredSize(float) const override;
	virtual FChildren* GetChildren() override { return &Children; }
	
};
