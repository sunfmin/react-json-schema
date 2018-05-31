import ReactDOM from 'react-dom';
import ContactForm from './components/ContactForm';
import StringField from './components/StringField';
import CheckboxField from './components/CheckboxField';

// If a package dependency: import ReactJsonSchema from 'react-json-schema';
import ReactJsonSchema from '../dist/react-json-schema';

const welcomeSchema = {
  '__component__': 'h2',
  'className': 'text-center',
  '__text__': 'Hello World!'
};

const welcomeBanner = new ReactJsonSchema();
ReactDOM.render(welcomeBanner.parseSchema(welcomeSchema), document.getElementById('welcome-banner'));

const formSchema = {
  '__component__': 'ContactForm',
  'title': 'Tell us a little about yourself, we\'d appreciate it',
  '__children__': [
    {
      '__component__': 'StringField',
      'label': 'What\'s your name',
      'name': 'fullname',
      'help': 'It\'s okay, don\'t be shy :)'
    },
    {
      '__component__': 'CheckboxField',
      'checkboxes': [
        {
          'label': 'I\'m already checked!',
          'defaultChecked': true,
          'key': 0
        },
        {
          'label': 'Here\'s another',
          'key': 10
        }
      ]
    }
  ]
};

const componentMap = { ContactForm, StringField, CheckboxField };
const contactForm = new ReactJsonSchema();
contactForm.setComponentMap(componentMap);

ReactDOM.render(contactForm.parseSchema(formSchema), document.getElementById('json-react-schema'));
