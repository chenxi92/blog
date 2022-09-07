# Configure alternate app icon

The way to change your apps icon at run time.



**Environment:**  Xcode 13.1, iOS 15

## Steps

### 1. Add Icon Assets to the project

- Select `Assets` folder and click the  `+`  button at the bottom then select  `iOS`  ->  `iOS App icon` to create a new icon folder with a specific name

- Prepare icons that match the required size and drag them to the corresponding places.
- Repeat the above steps if you want to create multiple alternate icons.



### 2. Setup `Build Settings`

- Selected the `Build Settings` after selecting the desired target in the  `Targets` , find `Asset Catalog Compiler - Options` section.

- Select `Alternate App Icon Sets`  and add the name of the icon assets (each name occupies one line).
- Change the value of the `Include All App Icon Assets` to `Yes` .

- Select `Primary App Icon Set Name` specified the primary app icon asset name.



### 3. Change Icon

Call the following code to change the icon:

```swift
// Set the iconName to nil to use the primary icon.
let iconName = "my-icon-name"
UIApplication.shared.setAlternateIconName(iconName) { (error) in
    if let error = error {
        print("Failed request to update the app’s icon: \(error)")
    }
}
```



The current icon's name is available through the property `alternateIconName` .



## Reference

[Configuring Your App to Use Alternate App Icons](https://developer.apple.com/documentation/xcode/asset_management/configuring_your_app_to_use_alternate_app_icons)