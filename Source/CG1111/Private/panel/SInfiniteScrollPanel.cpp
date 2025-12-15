#include "panel/SInfiniteScrollPanel.h"
#include "Layout/LayoutUtils.h"

void SInfiniteScrollPanel::FSlot::Construct(const FChildren& SlotOwner, FSlotArguments&& InArgs)
{
	TBasicLayoutWidgetSlot<FSlot>::Construct(SlotOwner, MoveTemp(InArgs));
}

void SInfiniteScrollPanel::Construct(const FArguments& InArgs, TArray<FSlot::FSlotArguments> InSlots)
{

    Orientation = InArgs._Orientation;
    SlotSpacing = InArgs._SlotSpacing;
    ContentPadding = InArgs._ContentPadding;
    PhysicalOffset = 0;

    if (InSlots.Num() > 0)
    {
        Children.AddSlots(MoveTemp(InSlots));
    }
}

void SInfiniteScrollPanel::OnArrangeChildren(const FGeometry& AllottedGeometry,
                                             FArrangedChildren& ArrangedChildren) const
{
    FVector2D Offset(ContentPadding.Left, ContentPadding.Top);
    for (int32 ChildIndex = 0; ChildIndex < Children.Num(); ++ChildIndex)
    {
        const FSlot& Slot = Children[ChildIndex];
        const TSharedRef<SWidget>& Widget = Slot.GetWidget();
        if (Widget->GetVisibility() == EVisibility::Collapsed)
        {
            continue;
        }
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

FVector2D SInfiniteScrollPanel::ComputeDesiredSize(float X) const
{
    FVector2D mDesiredSize = FVector2D::ZeroVector;
    for (int32 ChildIndex = 0; ChildIndex < Children.Num(); ++ChildIndex)
    {
        const FSlot& slot = Children[ChildIndex];
        const TSharedRef<SWidget>& Widget = slot.GetWidget();
        if (Widget->GetVisibility() == EVisibility::Collapsed)
        {
            continue;
        }
        const FVector2D ChildDesiredSize = Widget->GetDesiredSize() + slot.GetPadding().GetDesiredSize();
        if (Orientation == Orient_Vertical)
        {
            mDesiredSize.X = FMath::Max(mDesiredSize.X, ChildDesiredSize.X);
            mDesiredSize.Y += ChildDesiredSize.Y + (ChildIndex > 0 ? SlotSpacing.Y : 0);
        }
        else
        {
            mDesiredSize.Y = FMath::Max(mDesiredSize.Y, ChildDesiredSize.Y);
            mDesiredSize.X += ChildDesiredSize.X + (ChildIndex > 0 ? SlotSpacing.X : 0);
        }
        
    }
    mDesiredSize.X += ContentPadding.Left + ContentPadding.Right;
    mDesiredSize.Y += ContentPadding.Top + ContentPadding.Bottom;
    return mDesiredSize;
}

void SInfiniteScrollPanel::SetPhysicalOffset(float InOffset)
{
    PhysicalOffset = InOffset;
}

