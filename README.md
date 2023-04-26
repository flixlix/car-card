
# Car Card

> Custom Card for Home Assistant to display your different aspects of your car, for example its state of charge, range, etc... at a glance

![Example Configuration](https://user-images.githubusercontent.com/61006057/234698226-0b408ec3-d7e9-4d19-820c-7f47d222702d.png)

## Install

### HACS (recommended)

This card is not direclty available in  [HACS](https://hacs.xyz/)  (Home Assistant Community Store).  _HACS is a third party community store and is not included in Home Assistant out of the box._ Install HACS before trying to install this card To install this:

-   Go to HACS
-   Click on  `Frontend`
-   Click on the overflow Menu (three vertical dots)
-   Click on  `Custom Repositories`
-   Type this URL  [https://github.com/flixlix/car-card](https://github.com/flixlix/car-card)
-   In "Category", select  `lovelace`
-   Install via UI


<details>
<summary>Manual install</summary>

1. Download and copy `car-card.js` from the [latest release](https://github.com/flixlix/car-card/releases/latest) into your `config/www` directory.

2. Add the resource reference as decribed below.

#### Add resource reference

If you configure Dashboards via YAML, add a reference to `car-card.js` inside your `configuration.yaml`:

```yaml
resources:
  - url: /local/car-card.js
    type: module
```

Else, if you prefer the graphical editor, use the menu to add the resource:

1. Make sure, advanced mode is enabled in your user profile (click on your user name to get there)
2. Navigate to Settings -> Dashboards
3. Click three dot icon
4. Select Resources
5. Hit (+ ADD RESOURCE) icon
6. Enter URL `/local/car-card.js` and select type "JavaScript Module". 
   (Use `/hacsfiles/car-card/car-card.js` and select "JavaScript Module" for HACS install if HACS didn't do it already)

</details>

## Usage

### Card options

| Name                | Type      |   Default    | Description                                                                                                                                                                  |
|---------------------| --------- |:------------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type                | `string`  | **required** | `custom:car-card`.                                                                                                                                               |
| title               | `string`  |              | Shows a title at the top of the card in the Style of your Home Assistant Headers. |
| fields            | `object`  | **required** | One or more sensor entities, see [fields object](#fields-object) for additional entity options. |
| image | `object` | | Check [Image Configuration](#image-configuration). |

#### Fields Object

| Name                | Type      | Description                                                                                                                                                                  |
|---------------------| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| main | `object`  | Check [Main Field Configuration](#main-field-configuration). | 
| battery | `string`  | Check [Battery Field Configuration](#battery-field-configuration). |

##### Main Configuration

| Name                | Type      | Description                                                                                                                                                                  |
|---------------------| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| heading | `object`  | Check [Entity Configuration](#entity-configuration). | 
| subheading1 | `object`  | Check [Entity Configuration](#entity-configuration). |
| subheading2 | `object`  | Check [Entity Configuration](#entity-configuration). |

##### Battery Configuration

| Name                | Type      | Description                                                                                                                                                                  |
|---------------------| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| state_of_charge | `object`  | An Entity whose state varies between 0-100. A state of 100 means the battery is full. Check [Entity Configuration](#entity-configuration). | 
| target_state_of_charge | `object`  | An Entity whose state varies between 0-100. Check [Entity Configuration](#entity-configuration). |
| recommended_target | `number`  | A number between 0-100 as a threshold from which the progress bar turns red, signaling charging the car above this number might not be good for its health. A typical value here is `80`. |

#### Entity Configuration

> Additional Configuration Options may follow

| Name                | Type      | Description                                                                                                                                                                  |
|---------------------| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| entity | `string`  | An Entity Id providing the state for the given property. |

### Image Configuration

| Name                | Type      |   Default    | Description                                                                                                                                                                  |
|---------------------| --------- |:------------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| src                | `string`  | **required** | The Source URL of your an image of your car. Can also be a `/local/...` path if you have a local image.                                                                                                                                               |
| max_height               | `number`  | 200 | Maximum Height of the Image in pixels. |

## Example Configuration

```yaml
type: custom:car-card
title: Car Card
image:
  src: /local/vw_id3.png
  max_height: 150
fields:
  main:
    heading:
      entity: sensor.car_range
  battery:
    state_of_charge:
      entity: sensor.state_of_charge
    target_state_of_charge:
      entity: sensor.target_state_of_charge
    recommended_target: 80
```


![Example Configuration](https://user-images.githubusercontent.com/61006057/234698226-0b408ec3-d7e9-4d19-820c-7f47d222702d.png)
