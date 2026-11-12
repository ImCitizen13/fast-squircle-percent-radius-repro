# Stack trace

Captured with `adb logcat` on a Samsung Galaxy S24 (debug build from `npx expo run:android`)
running this app with `<FastSquircleView style={{ borderRadius: '40%' }} />`
and `react-native-fast-squircle@1.1.6`. The red-box/dev-launcher screen is in
[screenshots/01-crash-percent-radius.png](screenshots/01-crash-percent-radius.png).

Relevant frames: the base `BaseViewManagerDelegate` casts the prop value with `value as Double?`; a percentage
string (`"40%"`) reaches `com.fastsquircle.SplitDelegate.setProperty` and fails there.

```
Exception thrown when executing UIFrameGuarded
java.lang.ClassCastException: java.lang.String cannot be cast to java.lang.Double
	at com.facebook.react.uimanager.BaseViewManagerDelegate.setProperty(BaseViewManagerDelegate.kt:56)
	at com.facebook.react.viewmanagers.FastSquircleViewManagerDelegate.setProperty(FastSquircleViewManagerDelegate.java:30)
	at com.facebook.react.uimanager.BaseViewManagerDelegate.kotlinCompat$setProperty(BaseViewManagerDelegate.kt:22)
	at com.fastsquircle.SplitDelegate.setProperty(FastSquircleViewManager.kt:78)
	at com.fastsquircle.SplitDelegate.setProperty(FastSquircleViewManager.kt:63)
	at com.facebook.react.uimanager.ViewManager.updateProperties(ViewManager.java:102)
	at com.facebook.react.uimanager.ViewManager.createViewInstance(ViewManager.java:229)
	at com.facebook.react.uimanager.ViewManager.createView(ViewManager.java:147)
	at com.facebook.react.fabric.mounting.SurfaceMountingManager.createViewUnsafe(SurfaceMountingManager.kt:605)
	at com.facebook.react.fabric.mounting.SurfaceMountingManager.preallocateView(SurfaceMountingManager.kt:1124)
	at com.facebook.react.fabric.mounting.mountitems.PreAllocateViewMountItem.execute(PreAllocateViewMountItem.kt:39)
	at com.facebook.react.fabric.mounting.MountItemDispatcher.executeOrEnqueue(MountItemDispatcher.kt:379)
	at com.facebook.react.fabric.mounting.MountItemDispatcher.dispatchPreMountItemsImpl$lambda$8(MountItemDispatcher.kt:352)
	at com.facebook.react.fabric.mounting.MountItemDispatcher$$ExternalSyntheticLambda0.invoke(D8$$SyntheticClass:0)
	at com.facebook.react.internal.tracing.PerformanceTracer.trace(PerformanceTracer.kt:46)
	at com.facebook.react.internal.tracing.PerformanceTracer.trace(PerformanceTracer.kt:35)
	at com.facebook.react.fabric.mounting.MountItemDispatcher.dispatchPreMountItemsImpl(MountItemDispatcher.kt:331)
	at com.facebook.react.fabric.mounting.MountItemDispatcher.dispatchPreMountItems(MountItemDispatcher.kt:325)
	at com.facebook.react.fabric.FabricUIManager$DispatchUIFrameCallback.doFrameGuarded(FabricUIManager.java:1659)
	at com.facebook.react.uimanager.GuardedFrameCallback.doFrame(GuardedFrameCallback.kt:42)
	at com.facebook.react.modules.core.ReactChoreographer.frameCallback$lambda$1(ReactChoreographer.kt:58)
	at com.facebook.react.modules.core.ReactChoreographer$$ExternalSyntheticLambda0.doFrame(D8$$SyntheticClass:0)
	at android.view.Choreographer$CallbackRecord.run(Choreographer.java:1899)
	at android.view.Choreographer$CallbackRecord.run(Choreographer.java:1910)
	at android.view.Choreographer.doCallbacks(Choreographer.java:1367)
	at android.view.Choreographer.doFrame(Choreographer.java:1282)
	at android.view.Choreographer$FrameDisplayEventReceiver.run(Choreographer.java:1870)
	at android.os.Handler.handleCallback(Handler.java:995)
```
