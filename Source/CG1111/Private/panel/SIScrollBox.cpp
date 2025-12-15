#include "panel/SIScrollBox.h"


void SIScrollBox::Construct(const FArguments& InArgs)
{
	Orientation = InArgs._Orientation;
	TArray<FSlot::FSlotArguments> Slots;
	for (FSlot::FSlotArguments& SlotArg : const_cast<TArray<FSlot::FSlotArguments>&>(InArgs._Slots))
	{
		Slots.Add(MoveTemp(SlotArg));
	}
	SAssignNew(ScrollPanel, SInfiniteScrollPanel)
		.Orientation(Orientation)
		.SlotSpacing(InArgs._SlotSpacing)
		.ContentPadding(InArgs._ContentPadding);
	// 这是因为 SInfiniteScrollPanel::Construct 需要额外的 Slots 参数，而 SAssignNew 的链式调用无法传递这个参数。
	ScrollPanel->Construct(
		SInfiniteScrollPanel::FArguments()
			.Orientation(Orientation)
			.SlotSpacing(InArgs._SlotSpacing)
			.ContentPadding(InArgs._ContentPadding),
		MoveTemp(Slots)
	);
	ChildSlot
	[
		ScrollPanel.ToSharedRef()
	];
}

SIScrollBox::FScopedWidgetSlotArguments SIScrollBox::AddSlot()
{
	return InsertSlot(INDEX_NONE);
}

SIScrollBox::FScopedWidgetSlotArguments SIScrollBox::InsertSlot(int32 Index)
{
	// 手动创建 FSlot，然后构造 FScopedWidgetSlotArguments
	return FScopedWidgetSlotArguments{
		MakeUnique<FSlot>(),      // 创建新的 Slot
		ScrollPanel->Children,     // Children 容器引用
		Index                      // 插入位置（INDEX_NONE 表示追加到末尾）
	};
}

void SIScrollBox::RemoveSlot(const TSharedRef<SWidget>& WidgetToRemove)
{
	ScrollPanel->Children.Remove(WidgetToRemove);
}

void SIScrollBox::ClearChildren()
{
	ScrollPanel->Children.Empty();
}

int32 SIScrollBox::NumSlots() const
{
	return ScrollPanel->Children.Num();
}

void SIScrollBox::SetOrientation(EOrientation InOrientation)
{
	Orientation = InOrientation;
	ScrollPanel->Orientation = InOrientation;
}

void SIScrollBox::SetSlotSpacing(FVector2f InSpacing)
{
	ScrollPanel->SlotSpacing = InSpacing;
}

void SIScrollBox::SetContentPadding(FMargin InPadding)
{
	ScrollPanel->ContentPadding = InPadding;
}
	