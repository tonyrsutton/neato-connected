# Install with Home Assistant

My initiall, and recommened, way to use this repair. All versions of this repair will be supported via this route, later versions should be much easier since I plan on making it all as one package on HACS. (ESPHome will probably still be required)

# TODO: add images

**Overview of steps:**
1. Setup HACS and install required add-ons
2. Import the config to ESPHome
3. Flash the image to your ESP device
4. Connect the ESP device to your robot
5. Add the ESP device to Home Assistant
6. Setup the Home Assistant card
7. Install the ESP device on the robot
8. Enjoy your locally connected robot!

I know this might be quite a bit overwhelming, but the reason there is this many steps is to have it as detailed as possible. Once again, at any point, feel free to ask for help!

## Step 1

We need to install certain add-ons to the home assistant installation to use all the features of this project.

### Home assistant add-ons
Donwload "ESPHome Device Builder" by
1. Going to `Settings` --> `Add-ons` --> `Add-on Store` --> `Open "ESPHome Device Builder"`.
    - [![Open your Home Assistant instance and show the dashboard of an add-on.](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome&repository_url=https%3A%2F%2Fgithub.com%2Fesphome%2Fhome-assistant-addon)
2. Select install.
3. I would recommend to enable `Add to sidebar` and `Start on boot`. If you decide not to add it to the sidebar, you will need to open ESPHome by coming back to this page and selecting `Open web UI`.

### HACS
If you don't already have hacs, follow their guide to set it up: https://www.hacs.xyz/docs/use/. Once you have HACS setup, open it and install the following addons: (search with the id number!)
- `button-card` `146194325`
    - An button element to place on a dashboard with a lot of configurations to make the card look nice.
- `browser_mod` `194140521`
    - Allow for a popup when clicking on settings or holding down the spot clean button.
    - Don't forget to add the "Browser Mod" integration in Settings -> Devices & Services -> Add Integration or click this button: 
        - [![Open your Home Assistant instance and start setting up a new integration.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=browser_mod)
    - It will ask you if you want to register your browser as a device, you don't need to do this for it to work!

After installing these add-ons you need to refresh your page, however, some browsers need a hard refresh. This you can do by pressing `Ctrl + Shift + R`. If it still does not want to work you might need to restart Home Assistant.

## Step 2

### ESPHome Secrets
Open the ESPHome Builder and click the "Secrets" in the top right. Make sure your secrets include at the minimum this:
```yaml
# Generate at https://esphome.io/components/api/#api-key
neato_vacuum_api: "<API_KEY>"
# Generate at https://bitwarden.com/password-generator/
neato_vacuum_ota: "<OTA_PASSWORD>"

# Your Wi-Fi SSID and password
wifi_ssid: "<WIFI_SSID>"
wifi_password: "<WIFI_PASSWORD>"
```

Once you have filled this file with your values, save it, and make sure to never share this file if asking for support etc.

If you want to add more devices, best practice is to set the api key and ota password in your secrets file. Your wifi password and ssid should also be kept here. Since the esp device will be strapped to, or inside the robot OTA (over the air) updates is quite important for this use case.

### Config file
Once back at the ESPHome main page, click the big green button in the bottom left to add a new device. Read the information, but for now, click "Continue" and either import the [`neato_vacuum.yaml`](https://github.com/philip2809/neato-connected/releases/latest/download/neato_vacuum.yaml) file, or start with an empty configuration.

**The following two steps might be hard to do, feel free to ask for help in the discord or discussions.**

Now, since you may be using a different board then I am, and this might get complicated. You will need to find out what platform to set. Here is the list of [available platforms](https://esphome.io/components/#supported-microcontrollers). 

Next, you will need to figure out which pins to use, once again this is highly dependent on your board, both based on which ones you can easily connect too, but also what is supported on your platform. In some cases, the pins labeled `TX` and `RX` cannot be used, as these are used to upload the firmware, you will need to find GPIO pins that support using using UART, on the ESP32 many of the GPIO pins can be used. There is many tutorials for the different boards, here is some common ones:
- [ESP32](https://randomnerdtutorials.com/esp32-pinout-reference-gpios/)
- [ESP8266](https://randomnerdtutorials.com/esp8266-pinout-reference-gpios/)

## Step 3
Now you will need to build and flash the images onto your ESP device! While in the editor, press the "Install" button in the top right, since the device is not yet setup, select "Manual download", this will build the configuration file to an image you can flash, this might take a while on a fresh system, or not powerful hardware.

Once the image has been built, select to download in "Factory format", save this file on your computer and open [ESPHome Web](https://web.esphome.io/). Since this uses WebSerial you will need to use a chromium based browser. ESPHome has an amazing [guide](https://esphome.io/guides/physical_device_connection/) if this is your first time doing this, but to summerize, if you have an usb-port on your device, connect to it, if not you will need to connect to the `TX`, `RX`, `GND` and `3.3V/5V` with an TTY adapter. Then go into bootloader mode by pressing the "BOOT" button, if you don't have one, connect `GPIO0` to `GND`.

Once in ESPHome Web, connect your device to your computer, while going into bootloader mode, then select it in the list. Once selected, upload the firmware file you downloaded before and wait for it to finish.

Once the device has connected you need to verify that it works and you can see the web server it is hosting before we continue. For most people one of two links will bring you to the ESP device's web server:
- [`neato-vacuum.local`](http://neato-vacuum.local)
- [`neato-vacuum.lan`](http://neato-vacuum.lan)

**If you changed the name of your device in the config, these links will be different!**

If neither of these link work, please check that the device actually connected to your wifi and see if you can get the ip-address of the ESP device. If you are still having problems or have trouble finding the ip-address, feel free to ask for help!

## Step 4
When you have navigated to the site of the ESP device it should look something like this:
# todo: add image

This is the webserver of the device. It will show up as not connected since we are not connected to the robot, we are only connected to a power source so that the ESP device can be configured. Now you can connect the device to the robot via the debug port to make sure that it works are you want to! To do this:
1. Turn the robot off
2. Take of the bumper of the robot
3. Connect to the robot
    | Robot | ESP |
    |---|---|
    |RX|GPIO17|
    |3.3V|3.3V|
    |TX|GPIO16|
    |GND|GND|

    ![Connection diagram](pics/setup/noha-step_4-connection-diagram.png)
4. Turn the robot back on, this should power up the ESP device and you can now go to the webserver interface page we saw before and the data from the robot should now show up!
    # todo: add image
5. Click the different buttons to make sure that it works, if you have a D3-D7, drive it around with the manual mode, however, remeber that the bumper is off!

Now you will need to connect to the robot over it's serial debug port. 

To verify that everything works, either if you just want to try this out, or test what pins you can use before making a permanent installation you should take the bumper off and connect to the debug pins directly.
![debug-port-with-cables-annotated](./pics/d3/debug-port-with-cables-annotated.jpg)

| Robot | ESP |
|---|---|
|RX|TX (pin you picked)|
|3.3V|VCC / 3.3V|
|TX|RX (pin you picked)|
|GND|GND|


## Step 5

After flashing and connecting the ESP device to the robot we need to add the ESP device into Home Assistant.
1. Power the robot on if it is off
2. In Home Assistant navigate to: `Settings` --> `Devices & Services` -- `Click "Add integration"` --> `Search "ESPHome"`
3. Enter the hostname or ip address of the ESPHome device
    - If you haven't change the name of the device in the config, it is most likely `neato-vacuum.local` or `neato-vacuum.lan` depending on your router.
    - If you want to use the ip address, find what ip the device got in your router. If you decide to use the ip, make sure to set it static!
4. Click submit and the device should be added.

## Step 6
Copy the contents of [ha-card](https://github.com/philip2809/neato-connected/releases/latest/download/ha-card.yaml)

**If you have changed the name in the ESPHome config:**
1. Paste the content into a text editor
2. Go to `Developer tools` --> `States` --> `In "Filter entities" search for "_fuel_percent"`
3. There should be a result for `sensor.<ENTITY_ID>_fuel_percent`
    - This entity id is probaly the same as the name you gave but lowercase and dashes changed for underscores.
4. Replace all instances of `neato_vacuum` with your `<ENTITY_ID>`


### Add the card
1. Press the pen icon in the top right on the desired dashboard
2. Press `Add card`
3. Scroll to the buttom and select `Manual`
4. Paste the contents of the card (if you changed the name, then you need to modify it in here)

### Vacuum Entity
You can also use neato-connected as an Home Assistant vacuum entity. The vacuum entity is needed in case you want to use any of the automations or scripts.

# todo: add picture of vacuum entity

Sadly vacuum entities can only be added by editing the Home Assistant config files, however, I will walk though the entire proccess!
1. Going to `Settings` --> `Add-ons` --> `Add-on Store` --> `Open "File editor"`.
    - [![Open your Home Assistant instance and show the dashboard of an add-on.](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_configurator&repository_url=https%3A%2F%2Fgithub.com%2Fesphome%2Fhome-assistant-addon)
2. Select install.
3. I would recommend to enable `Add to sidebar` and `Start on boot`. If you decide not to add it to the sidebar, you will need to come back here to open the file editor.
4. Open the file editor by clicking on "Open web UI" or if you added it to the sidebar, click on it in the sidebar.
5. Open the main `configuration.yaml` file by clicking on the folder icon in the top left then selecting the `configuration.yaml` file.
6. Add the following like to this config and then save by pressing the red save button in the top right or press `Ctrl + S`.
    ```yaml
    template: !include_dir_merge_list templates/
    ```
7. Click on the folder icon again and create a folder called `templates`.
8. Create a new file in this folder called `vacuums.yaml`.
9. Put the content of [`ha-vacuum-entity.yaml`] into this file
    - if you have multiple vacuums, duplicate the config from the `- name:` part and change the ids!
10. Save the file and make sure the configuration is good by going to `Developer tools` --> `YAML` --> `Click on "Check configuration"` --> `If configuration is good, click on "All YAML configuration" under "YAML configuration reloading"`.

### Schedule automation

## Step 7
**Before you make a permanent installation, make sure it all works via Home Assistant as you want it to!**

And once you are ready for the permanent installation, you there is two ways to do it:

[Externally; by drilling a hole in the bumper](./install-externally.md) | [Internally; by connecting to the debug port using an JST-XH connector (recommended)](./install-internally.md)
:-------------------------:|:-------------------------:
![cables-via-bumper](./pics/d3/cables-via-bumper.jpg) ![d3-install-outside](./pics/installs/d3-install-outside.png) | ![jay-jst-xh](./pics/installs/jay/2-install-JST-XH.jpg) ![jay-installed](./pics/installs/jay/4-installed-and-taped.jpg)


## Step 8
Now you can enjoy your locally controllable neato vacuum cleaner! Of course there is some quirks with this repair, however we feel they are worth the ability to regain functionality.

Missing features or annoying workarounds:
- Haven't found a way to tell the robot to dock via the serial interface
- Once in cleaning paused/running mode, to get the robot back into standby/idle, you need to either hold the button on the robot, or press the "STOP" button in home assistant, which will reboot the robot. You can also let the cleaning finish of course.
