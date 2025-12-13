#include "panel/SInfiniteScrollPanel.h"

void SInfiniteScrollPanel::FSlot::Construct(const FChildren& SlotOwner, FSlotArguments&& InArgs)
{
	TBasicLayoutWidgetSlot<FSlot>::Construct(SlotOwner, MoveTemp(InArgs));
}

void SInfiniteScrollPanel::Construct(const FArguments& InArgs, TArray<FSlot::FSlotArguments>& InSlots)
{
	Orientation = InArgs._Orientation;
	SlotSpacing = InArgs._SlotSpacing;
	ContentPadding = InArgs._ContentPadding;
	// PhysicalOffset = 0;
	
	//Children.AddSlot(MoveTemp(InSlots));
}


/**
 
 void SMyScrollPanel::OnArrangeChildren(const FGeometry& AllottedGeometry, FArrangedChildren& ArrangedChildren) const
{
    // 起始位置（考虑内边距）
    FVector2D Offset(ContentPadding.Left, ContentPadding.Top);

    for (int32 ChildIndex = 0; ChildIndex < Children.Num(); ++ChildIndex)
    {
        const FSlot& Slot = Children[ChildIndex];
        const TSharedRef<SWidget>& Widget = Slot.GetWidget();

        if (Widget->GetVisibility() == EVisibility::Collapsed)
        {
            continue;
        }

        const FVector2D ChildDesiredSize = Widget->GetDesiredSize();

        // 计算对齐
        const AlignmentArrangeResult XResult = AlignChild<Orient_Horizontal>(ChildDesiredSize.X, Slot, Slot.GetPadding());
        const AlignmentArrangeResult YResult = AlignChild<Orient_Vertical>(ChildDesiredSize.Y, Slot, Slot.GetPadding());

        // 计算最终位置（考虑滚动偏移）
        FVector2D ChildOffset = Offset + FVector2D(XResult.Offset, YResult.Offset);
        if (Orientation == Orient_Vertical)
        {
            ChildOffset.Y -= PhysicalOffset;
        }
        else
        {
            ChildOffset.X -= PhysicalOffset;
        }

        ArrangedChildren.AddWidget(AllottedGeometry.MakeChild(
            Widget,
            ChildOffset,
            FVector2D(XResult.Size, YResult.Size)
        ));

        // 更新下一个控件的位置
        if (Orientation == Orient_Vertical)
        {
            Offset.Y += ChildDesiredSize.Y + SlotSpacing.Y;
        }
        else
        {
            Offset.X += ChildDesiredSize.X + SlotSpacing.X;
        }
    }
}

FVector2D SMyScrollPanel::ComputeDesiredSize(float) const
{
    FVector2D DesiredSize = FVector2D::ZeroVector;
    
    for (int32 ChildIndex = 0; ChildIndex < Children.Num(); ++ChildIndex)
    {
        const FSlot& Slot = Children[ChildIndex];
        const TSharedRef<SWidget>& Widget = Slot.GetWidget();

        if (Widget->GetVisibility() == EVisibility::Collapsed)
        {
            continue;
        }

        const FVector2D ChildDesiredSize = Widget->GetDesiredSize() + Slot.GetPadding().GetDesiredSize();

        if (Orientation == Orient_Vertical)
        {
            DesiredSize.X = FMath::Max(DesiredSize.X, ChildDesiredSize.X);
            DesiredSize.Y += ChildDesiredSize.Y + (ChildIndex > 0 ? SlotSpacing.Y : 0);
        }
        else
        {
            DesiredSize.Y = FMath::Max(DesiredSize.Y, ChildDesiredSize.Y);
            DesiredSize.X += ChildDesiredSize.X + (ChildIndex > 0 ? SlotSpacing.X : 0);
        }
    }

    // 加上内边距
    DesiredSize.X += ContentPadding.Left + ContentPadding.Right;
    DesiredSize.Y += ContentPadding.Top + ContentPadding.Bottom;

    return DesiredSize;
}

void SMyScrollPanel::SetPhysicalOffset(float InOffset)
{
    PhysicalOffset = InOffset;
    
    */