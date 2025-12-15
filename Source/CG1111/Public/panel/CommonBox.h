#pragma once

#include "CoreMinimal.h"
#include "Components/PanelWidget.h"
#include "CommonBox.generated.h"

class SIScrollBox;

UCLASS()
class CG1111_API UCommonBox : public UPanelWidget
{
	GENERATED_BODY()
	// q1 ChildWidgetClass 对应的组件是ScrollBox，还是ScrollBox中的子组建类型？
	// q2 ClampMin = "0"？
	// q3 #if WITH_EDITOR？
public:
	UCommonBox(const FObjectInitializer& ObjectInitializer);
	/** 滚动方向 */
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	TEnumAsByte<EOrientation> Orientation;
	
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	TSubclassOf<UUserWidget> ChildWidgetClass;
	
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	int32 ShowNum = 0;
	
	/** Item 间距 */
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	FVector2f InnerSlotPadding;
	
	/** 内边距 */
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	FMargin ContentPadding;
	
public:
	UFUNCTION(BlueprintCallable)
	void SetOrientation(EOrientation NewOrientation);
	
	//~ Begin UWidget Interface
	virtual void SynchronizeProperties() override;
	virtual void ReleaseSlateResources(bool bReleaseChildren) override;
	//~ End UWidget Interface
	
#if WITH_EDITOR
	virtual const FText GetPaletteCategory() override;
#endif
	
protected:
	//~ Begin UWidget Interface
	virtual TSharedRef<SWidget> RebuildWidget() override;
	//~ End UWidget Interface
	
	// UPanelWidget
	virtual UClass* GetSlotClass() const override;
	virtual void OnSlotAdded(UPanelSlot* Slot) override;
	virtual void OnSlotRemoved(UPanelSlot* Slot) override;
	
protected:
	TSharedPtr<SIScrollBox> MyScrollBox;
	
private:
	/** 上一次的预览数量（用于检测变化） */
	int32 LastShowNum = 0;
	
	
	
	
	
	
	
};
