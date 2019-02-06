# Circle-Visualizer

## 1. Behind the concept

The aim of the “Circle Visualizer” project is to provide an innovative way to visualize music, highlighting the harmonic relations in a chord progression. The studies behind harmony look into the “Circle of fifths” which represent all the notes from the chromatic scale spaced by fifth intervals: through that, it can be seen what are and how many are the chords and the alterations for each key.


<p align="center"> <img width="300" height="300" src="Readme_images/circle.PNG" > </p>
<p align="center"> <strong><em>Fig.1</strong> Circle of fifths</em> </p>


Therefore, the circle of fifths is a useful tool to find the key from a chord progression. The concept behind that is to represent it as an open cylinder (Fig.2), in which on the base are located all the 12 notes from the chromatic scale spaced by fifths, and 
on the lateral surface the chords deriving from the respective major scales’ modes, related to their key. The sorting choice through which the chords are visualized rely to the study of the circle of fifths and to the “brightness” of the mode they represent: warm colors are chosen for more brightness as well as cold ones for less brightness.  

For this version it has been decided to limit the choice of the key based only on seventh chords (major, minor, dominant, semi-diminished), as they provide more information than simple triads: for example a fifth chord, derived from the mixolydian scale, can be easily recognized with its quadriad because of  its "seventh dominant" attribute; in contrast, with the triad the information of the seventh interval is lost and remains a simple major chord which could be easily misinterpreted.


<p align="center"> <img width="300" height="300" src="Readme_images/unnamed.jpg" > </p>
<p align="center"> <strong><em>Fig.2</strong> Modal circle of fifths </em> </p>

## 2. Input: keyboard and MIDI management

In order to study the harmony of a chord sequence, an interface is needed to have chords as input and and so the notes. A two-octave keyboard (extendible thanks to special keys) has been chosen, which covers the octaves from C1 to C7.

It is possible to send an input in several ways: by clicking with the mouse on-screen, by pressing keys on the PC keyboard or via an external MIDI keyboard or device able to send  MIDI messages (tested with micro:bit).

Sounds generation is managed by the Web Audio APIs: they allow not only the creation of sounds through oscillators but also functions which can process, manipulate signals with a great freedom degree.
For what concern MIDI messages, they are managed by the Web MIDI APIs. They provide two basic functions:

**onMIDISuccess**: makes a loop around all the inputs to find any MIDI input. Once you find an incoming MIDI message, it invokes the function<br>
**getMIDImessage**: assigns two values ​​of the MIDI message to two variables: midi_number for the MIDI value of the note and on_off  for the attack (144) and release (128) values.
The note frequency from the midi_number therefore is then calculated using the function:



To this point, the playNote function is called, which generates the oscillators at the determined frequency that are connected to a master volume controlled by the attack / release value.

## 3. Output: visualizations

Several types of music visualization has been provided, in real time or not, to show the harmonic but also typical aspects of the audio signal as a wave.


<p align="center"> <img width="600" height="300" src="Readme_images/3.png" > </p>
<p align="center"> <strong><em>Fig.3</strong>  Keyboard, display and frequency spectrum </em> </p>

### 3.1 real-time visualizations

Once the inputs are sent, one can view:

- the **spectrum of the input signal** (Fig.4): allows to display the fundamental frequency of each note with its harmonics, therefore also the spectrum of the chord played and also provides a visual feedback of the input acquisition;

<p align="center"> <img width="300" height="300" src="Readme_images/4.png" > </p>
<p align="center"> <strong><em>Fig.4</strong> Detail of the frequency spectrum (Dm7 chord)</em></p>

- **Chord progression display** (Fig.5): The chords on which all is based are only seventh chords; for this first version an algorithm is used to recognize the chord based on a dictionary created ad hoc ("dictionary.js") containing the name of the chord and an array of the four notes whose the chord is constituted (in the next versions it will be based on the distance of the intervals) as a key-value association.
Once the chords are recognized, the progression is temporarily saved and another algorithm is launched with the task of finding the key corresponding to the progression: the key will be displayed in the "KEY" box.

<p align="center"> <img width="400" height="100" src="Readme_images/progressione.PNG" > </p>
<p align="center"> <strong><em>Fig.5</strong> Detail of display with key</em></p>

**Keyboard and display commands**:

Overview of the octaves (Fig.6) that the keyboard is covering in the current state (C4-C5 by default): you can raise or lower the octave by one using <img width="100" height="20" src="Readme_images/octave.PNG" >

<p align="center"> <img width="450" height="100" src="Readme_images/7.png" > </p>
<p align="center"> <strong><em>Fig.6</strong>  Octaves’ overview</em></p>

- volume slider: by default the volume is set to 1 but can be adjusted from 0 (slider all the way down) up to 2 (slider all up);

 <img width="100" height="20" src="Readme_images/keyboard_keys.PNG" >: by pressing this key, users who decide to try the keyboard through the computer can display the keys corresponding to each note (Fig.7);
 
<p align="center"> <img width="450" height="100" src="Readme_images/8.png" > </p>
<p align="center"> <strong><em>Fig.7 </strong>Keyboard with matching letters</em></p>

<img width="100" height="20" src="Readme_images/reset.PNG">:allows you to delete the entire visualization (read the next paragraph) and to be able to re-input a new progression.

### 3.2 Circle of fifths’ graphic implementation 

As you can see from Fig.9 there are two main boxes:

On the left are arranged the modes of the major scales corresponding to each note: the order of the modes is chosen in such a way as to have a "brightness" scale: from a cheerful and brilliant sound (IV - Lydian) to which it is associated with a warmer color, to a more sad and gloomy one (VII - Locrian) to which a colder color is associated.
The box on the right is the graphical representation of the circle of fifths: an open cylinder where in its side surface are displayed rectangles of different color according to the corresponding mode of the played chord. It is a matrix where the columns indicate the keys and the rows indicate the modes. It is possible for a chord to belong to more than one key but by assuming different functions (hence different modes): the table can display all the chord memberships, also showing multiple rectangles simultaneously. 

From the table it is therefore possible to understand:
1 - to which key belongs the  played chord;
2 - for each key, what is the function (mode) of the chord;
3 - possible chord paths between different "neighboring" tones.

<p align="center"> <img width="450" height="200" src="Readme_images/9.png" > </p>
<p align="center"> <strong><em>Fig.9 </strong> Graphic visualization of the circle of fifths.</em></p>


