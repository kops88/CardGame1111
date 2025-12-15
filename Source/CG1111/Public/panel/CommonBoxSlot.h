#pragma once
#include "CoreMinimal.h"
#include "Components/PanelSlot.h"
#include "panel/SInfiniteScrollPanel.h"
#include "CommonBoxSlot.generated.h"

class SIScrollBox;
UCLASS()
class CG1111_API UCommonBoxSlot : public UPanelSlot
{
	GENERATED_BODY()

public:
	UCommonBoxSlot(const FObjectInitializer& ObjectInitializer);
	

public:

	UPROPERTY(EditAnywhere, BlueprintReadOnly)
	FMargin Padding;
	UPROPERTY(EditAnywhere, BlueprintReadOnly)
	TEnumAsByte<EHorizontalAlignment> HorizontalAlignment;
	UPROPERTY(EditAnywhere, BlueprintReadOnly)
	TEnumAsByte<EVerticalAlignment> VerticalAlignment;
public:	
	UFUNCTION(BlueprintCallable)
	void SetPadding(FMargin InPadding);
	UFUNCTION(BlueprintCallable)
	void SetHorizontalAlignment(EHorizontalAlignment InHorizontalAlignment);
	UFUNCTION(BlueprintCallable)
	void SetVerticalAlignment(EVerticalAlignment InVerticalAlignment);
	
	/** ReBuildWidget()创建slate后，将UMG属性同步到Slate；可以手动调用 */
	virtual void SynchronizeProperties() override;
	
	/** 被销毁时，释放slate资源，清理TsharedPtr引用 */
	virtual void ReleaseSlateResources(bool bReleaseChildren) override;
	
	/** 构建 Slate Slot */
	void BuildSlot(TSharedRef<SIScrollBox> ScrollBox);

private:
	SInfiniteScrollPanel::FSlot* Slot;
};

