# Project status

### Roadmap & current state

- Version 1. Current state of the project gives you basic local control
    - Neato cleaning logic
    - Will always maintain and get support
    - Occasional updates based on feature requests or bugs
- Version 2. Currently a work in progress, all the features in a non-ideal way (ETA: March 2026, if all stars align)
    - ROS2 & Neato hybrid
        - Neato cleaning logic
        - ROS2 for nogo-lines and zone cleaning, (return to dock?)
            - NOTE: Big limitation - if it goes outside of its area, all we can do is "move it back"
- Version 3. End goal of project, any lidar vacuum should be supported as long as a "driver" for each vacuum is created. (ETA: future)
    - Fully custom cleaning logic and navigation via ROS2
    - There might be limitations on how good this can be, relying on a serial interface, how fast commands can happen, etc
    - Would work with a fully custom-made robot

#### Version 1.2
- Add support for Connected, D70-D85, XV-series on firmware `2.2.0` or `2.2.1`
- Event based commands, return to dock and manual driving for D3-D7
- Full non-home assistant version
- Rework docs, add faq
- Add Home Assistant entity and automations/scripts


### Supported features, version 1
- D3-D7 
    - **Features**    
        - clean house
        - clean spot
        - pause
        - resume
        - stop
        - ui status
        - robot status
        - errors 
        - alerts
        - return to dock
        - manual driving
- Connected, D70-D85, XV-series
    - **Quirks:**
        - limited status ("dumb" status, set based on button clicks)
        - actions are done by using the `SetButton` command to simulate a user clicking the buttons on the robot, moving the cursor on the screen
    - **Features**    
        - clean house
        - clean spot
        - pause
        - resume
        - stop
        - return to dock
        - errors
