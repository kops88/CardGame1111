#pragma once
#include "CoreMinimal.h"
#include "Widgets/SCompoundWidget.h"
#include "Widgets/DeclarativeSyntaxSupport.h"
#include "SInfiniteScrollPanel.h"

/**
* 1. ChildSlot = ScrollPanel
* 2. 处理滚动逻辑、滚动条、输入事件等
*/

class SIScrollBox : public SCompoundWidget
{
public:
	//q1 FSlot?
	//q2 SlotSpacing, ContentPadding _SlotSpacing在类中没有声明
	//q3 SLATE_SLOT_ARGUMENT(FSlot, slots) 中的slots是？
	
	using FSlot = SInfiniteScrollPanel::FSlot;
	SLATE_BEGIN_ARGS(SIScrollBox)
		:_Orientation(Orient_Vertical)
		,_SlotSpacing(FVector2f::ZeroVector)
		,_ContentPadding(FMargin())
	{

	}
		SLATE_SLOT_ARGUMENT(FSlot, Slots)
		SLATE_ARGUMENT(EOrientation, Orientation)
		SLATE_ARGUMENT(FVector2f, SlotSpacing)
		SLATE_ARGUMENT(FMargin, ContentPadding)
	SLATE_END_ARGS()
	void Construct(const FArguments& InArgs);
	
	/** 添加 Slot */
	//q4 FScopedWidgetSlotArguments？
	using FScopedWidgetSlotArguments = TPanelChildren<FSlot>::FScopedWidgetSlotArguments;
	/** 添加 Slot（返回 Scoped 对象，支持链式调用） */
	FScopedWidgetSlotArguments AddSlot();
	/** 在指定位置插入 Slot */
	FScopedWidgetSlotArguments InsertSlot(int32 Index);
	/** 移除 Slot */
	void RemoveSlot(const TSharedRef<SWidget>& WidgetToRemove);

	/** 清空所有子控件 */
	void ClearChildren();
	
	/** 获取子控件数量 */
	int32 NumSlots() const;

	/** 设置滚动方向 */
	void SetOrientation(EOrientation InOrientation);

	/** 设置间距 */
	void SetSlotSpacing(FVector2f InSpacing);

	/** 设置内边距 */
	void SetContentPadding(FMargin InPadding);

	
protected:
	TSharedPtr<SInfiniteScrollPanel> ScrollPanel;
	EOrientation Orientation;
};