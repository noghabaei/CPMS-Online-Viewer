# CPMS Online Viewer

Live App: 
<a href="http://cpms-viewer.herokuapp.com/" target="_blank">http://cpms-viewer.herokuapp.com/</a>

Application to enable loading, viewing and modifying 3-D generated construction models and point clouds on the Web using only front-end technology stack. Major functionalities of the application include:
- Dynamic construction schedule viewer
- Element View
- Point Cloud Compatibility View
- Picture overlay

Description video: https://www.youtube.com/watch?v=gv7z00ireis

## Technology Stack:
- Three.js r110
- Potree 1.6
- Python 3
- Django 2.1

Refer to [requirements.txt](https://github.com/mojtaba1995/CPMS-Online-Viewer/blob/main/requirements.txt) for other dependencies.

## How to install:

1. Clone this repository.
2. In project root, run `pip3 install -r requirements.txt` to install dependencies.

## How to run:
From the project root, run the following commands:

```
python manage.py makemigrations
python manage.py migrate

python manage.py createsuperuser

python manage.py runserver
```

## Technical Documentation:

### Important Directories

| Component | DIR Path |
| -------------- | ---------- |
| Front-end application | core/ |
| Django Back-end application | app/ |
| Application dependencies | requirements.txt |
| Templates | core/templates/ |
| Static code assets | core/static/assets/ |
| Three.js Library | core/static/assets/three/ |
| Potree Library | core/static/assets/three/potree-main/ |
| Signals.js Library | core/static/assets/signals/ |
| Misc JavaScript Dependencies | core/static/assets/js/ |
| Main Point Clouds | https://mojtaba1995.github.io/clouds/cloud1/cloud.js </br> https://mojtaba1995.github.io/clouds/cloud2/cloud.js </br> https://mojtaba1995.github.io/clouds/cloud3/cloud.js |
| Compatibility Panel Point Clouds | core/static/assets/pointclouds/ |

</br>
</br>

### View Page

| Feature | Source Code File |
| -------------- | ---------- |
| BIM Load | core/templates/index.html |
| Point Cloud Load | core/templates/index.html |
| Element View Panel | core/templates/index.html |
| Compatibility Panel | core/static/assets/js/CompatibilityPanel.js |
| Transform Panel | core/static/assets/js/CompatibilityPanel.js |

#### **Element View Panel:**
The Element View panel loads at startup and offers a dropdown list of all the elements in the BIM.</br>
Once an element is selected from the dropdown, its information (description and name) is populated in the info field and the element is loaded in the canvas.</br>
The Compatibiltiy Check button is used to toggle the Compatibility Mode/View Mode panel on the bottom right of the View page. 
![Element Panel](./res/element_panel.jpg)

#### **Compatibility Mode Panel:**
The Compatibility Mode panel loads at startup and offers a dropdown list of all point clouds corresponding BIM elements.</br>
Once an point cloud is selected from the dropdown, its information (name) is populated in the info field and the it is loaded in the panel canvas.</br>
The Bring Element button is used to load the selected point cloud in the main canvas with the BIM and the main point cloud, where the loaded point cloud can be transformed and placed where needed.

![Compatibility Panel](./res/compat_panel.jpg)
![Bring Element](./res/bring_element.jpg)

</br>
</br>

### **Compatibility Page (In Progress)**
| Feature | Source Code File |
| -------------- | ---------- |
| Cross Section Viewer | core/templates/compatibility-test.html |

The Compatibility page, when complete, should display the main point cloud and a cross section of the point cloud in two canvases side-by-side.</br>
The source of the cross-section should would be a plane that is overlayed on the point cloud in the first canvas, and the cross-section that is generated in the second canvas is the section of the point cloud that is present inside the intersecting plane.

![Compatibility View](./res/compat_view.jpg)
*Intermediate page for Compatibiltiy View*

</br>
</br>

### **User Profile Page**
| Feature | Source Code File |
| -------------- | ---------- |
| User Profile Form | app/forms.py </br> app/views.py </br> app/models.py |
| Profile Pictures | Database |

The profile page presents a form with the logged in user details that are stored in the database, and gives a mechanism to modify those details.</br>
User can just change the values to be modified and press on Save, which saves the form with the new values. </br>
User can also change their profile picture, which for now is stored in the database. </br>
In the DEV environment, the and SQLite database is used, whereas PostGRESQL is used on Heroku by default to store user details.

![Profile Page](./res/profile.png)

</br>
</br>

## Team
[Mojtaba Noghabaei](https://github.com/mojtaba1995) </br>
[Chinmay Terse](https://github.com/cterse) </br>
[Arpitha Vijaykumar](https://github.com/VArpitha)