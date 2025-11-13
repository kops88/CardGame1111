// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "JsEnv.h"
#include "Engine/GameInstance.h"
#include "MyGameInstance.generated.h"

/**
 * 
 */
UCLASS()
class CG1111_API UMyGameInstance : public UGameInstance
{
	GENERATED_BODY()

public:
	virtual void OnStart() override;

	virtual void Shutdown() override;

	TSharedPtr<puerts::FJsEnv> GameScript;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	bool bDebugMode;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	bool bWaitForDebugger;

	
};
