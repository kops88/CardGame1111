#pragma once
#include "CoreMinimal.h"
#include "Components/PanelWidget.h"
#include "Components/ScrollBox.h"
#include "CommonBox.generated.h"

class SCommonBox;

UCLASS()
class CG1111_API UCommonBox : public UPanelWidget
{
	GENERATED_BODY()

public:
	UCommonBox(const FObjectInitializer& ObjectInitializer);
	

protected:
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	TEnumAsByte<EOrientation> Orientation;
	
	virtual TSharedRef<SWidget> RebuildWidget() override;
	void SetOrientation(EOrientation newOrientation);
	/** ReBuildWidget()创建slate后，将UMG属性同步到Slate；可以手动调用 */
	virtual void SynchronizeProperties() override;
	/** 被销毁时，释放slate资源，清理TsharedPtr引用 */
	virtual void ReleaseSlateResources(bool bReleaseChildren) override;
	
	virtual UClass* GetSlotClass() const override;
	virtual void OnSlotAdded(UPanelSlot* InSlot) override;
	virtual void OnSlotRemoved(UPanelSlot* InSlot) override;
private:
	TSharedPtr<SCommonBox> mBox;
	
};

