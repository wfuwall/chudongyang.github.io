### mac 下 fluter 的环境配置
1. 下载 flutter SDK 的安装包
去[flutter 中文网](https://flutter.cn/docs/get-started/install/macos)下载即可，可以直接下载 zip 包（需要解压），也可以从 gitHub 上 clone。

2. 配置环境变量
在 .bash_profile 文件中配置以下命令后，重新执行刚修改的初始化文件，使之立即生效
```
# 配置 flutter/bin 所在目录的环境变量
export PATH=/Users/chu/app/flutter/bin:$PATH
# 配置资源的环境变量
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

3. 检查当前的环境配置
通过以下命令检查当前的环境配置,显示结果如下图
```
# 展示flutter的命令帮助
flutter -h 
# 检查当前的环境配置
flutter doctor 
flutter doctor -v
```
<img src="/flutter-doctor.png"  height="580" width="auto">
> 如果有[!] ✗ 标志，表示本行检测不通过，需要做一些设置或者安装一些软件。

4. 完成 [!] Android Studio (version 3.6) 检测
参考 flutter 中文网[安装 Android Studio](https://flutter.cn/docs/get-started/editor?tab=androidstudio)安装以下 IDE 和 插件即可
- 安装 Android Studio
- 安装 Flutter 和 Dart 插件
<img src="/android-studio.png"  height="380" width="auto">
> 再次执行 `flutter doctor` 后可以看到 Android Studio 检查通过了

5. 完成 Android toolchain - develop for Android devices 检测
- 首先我们先执行一下命令,如果没有报错，界面会要求输入Y/N,一路输入Y就行了
```
flutter doctor --android-licenses
```
- 如果出现 `Android sdkmanager tool not found` 错误，根据提示  `/Users/chu/Library/Android/sdk/tools/bin/sdkmanager` 发现 `/Users/chu/Library/Android/sdk` 目录下并没有 tools 文件夹, 这是因为我们需要安装一个过时的 Android SDK Tools(应该是 Android Studio 的问题, 取消 Hide Obselete Packages 选中可以看到这个包)，而我们下载的新版的 Android Studio 默认是不会安装这个废弃的 SDK 的，我们安装完后重新执行上面的命令，一路 Y 就可以了，此时检查可以发现检查通过了
<img src="/none-tools.png"  height="480" width="auto">

6. 完成 Xcode - develop for iOS and macOS 检测
首先我们需要安装 Xcode 的最新版本，然后运行 `flutter doctor -v` 发现还有有问题，按照提示操作 `sudo gem install cocoapods` 下载即可完成此项检测
<img src="/xcode.png"  height="160" width="auto">

7. 完成 Connected device 检测
Connected devices 指的是连接设备，用电脑连接上手机后，再次进行 `flutter doctor -v` 检测发现已经全部通过了


