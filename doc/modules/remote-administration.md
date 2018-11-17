# Remote administration module

This module is used for remote administation of the bot.

For bot administrators only.

## Technical info

- **module name:** "remote-administration"
- **available commands:**
    - [load module](#load-module)
    - [unload module](#unload-module)
    - [reload module](#reload-module)

## Available commands

### Load module

Loads a module into the module handler.

- **ivocation:** `loadModule {moduleName}`
- **response type:** message reply
- **response:** notification if module was sucessfully loaded or not

### Unload module

Unloads a module from the module handler.

- **ivocation:** `unloadModule {moduleName}`
- **response type:** message reply
- **response:** notification if module was sucessfully unloaded or not

### Reload module

Reloads a module in the module handler.

- **ivocation:** `reloadModule {moduleName}`
- **response type:** message reply
- **response:** notification if module was sucessfully reloaded or not
