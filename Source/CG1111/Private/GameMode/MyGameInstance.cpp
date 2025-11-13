// Fill out your copyright notice in the Description page of Project Settings.


#include "GameMode/MyGameInstance.h"

void UMyGameInstance::OnStart()
{
	Super::OnStart();
	if (bDebugMode)
	{
		GameScript = MakeShared<puerts::FJsEnv>(
			std::make_unique<puerts::DefaultJSModuleLoader>(TEXT("JavaScript")),
			std::make_shared<puerts::FDefaultLogger>(),
			8080
		);
		if (bWaitForDebugger)
		{
			GameScript->WaitDebugger();
		}
	}
	else
	{
		GameScript = MakeShared<puerts::FJsEnv>();
	}
	GameScript->Start("MainGame");
}

void UMyGameInstance::Shutdown()
{
	Super::Shutdown();
	GameScript.Reset();
}
