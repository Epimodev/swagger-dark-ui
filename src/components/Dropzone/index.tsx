import {
  createElement,
  Component,
  ReactNode,
  SyntheticEvent,
  KeyboardEvent,
  DragEvent,
} from 'react';

interface Props {
  accept?: string;
  children: (params: State) => ReactNode;
  onChange: (file: File) => void;
}

interface State {
  isOver: boolean;
  focused: boolean;
}

const ENTER_CHAR_CODE = 13;
const containerStyle = { display: 'inline-block', outline: 'none' };
const inputStyle = { display: 'none' };

class Dropzone extends Component<Props, State> {
  input: HTMLInputElement | null = null;

  constructor(props: Props) {
    super(props);

    this.state = { isOver: false, focused: false };

    this.fileDragEnter = this.fileDragEnter.bind(this);
    this.fileDragLeave = this.fileDragLeave.bind(this);
    this.fileDrop = this.fileDrop.bind(this);
    this.openFileSelector = this.openFileSelector.bind(this);
    this.onZoneKeyPress = this.onZoneKeyPress.bind(this);
    this.setFocusState = this.setFocusState.bind(this);
    this.unsetFocusState = this.unsetFocusState.bind(this);
    this.changeFile = this.changeFile.bind(this);
    this.setInput = this.setInput.bind(this);
  }

  componentDidMount() {
    window.addEventListener('dragover', this.preventDrop);
    window.addEventListener('drop', this.preventDrop);
  }

  componentWillUnmount() {
    window.removeEventListener('dragover', this.preventDrop);
    window.removeEventListener('drop', this.preventDrop);
  }

  preventDrop(event: Event) {
    event.preventDefault();
  }

  fileDragEnter(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    this.setState({ isOver: true });
  }

  fileDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    this.setState({ isOver: false });
  }

  fileDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    this.setState({ isOver: false });
    const fileList: FileList = event.dataTransfer.files;

    if (fileList.length > 0) {
      const file = fileList[0];
      this.props.onChange(file);
    }
  }

  openFileSelector() {
    if (this.input) {
      this.input.click();
    }
  }

  onZoneKeyPress(event: KeyboardEvent<HTMLDivElement>) {
    if (event.charCode === ENTER_CHAR_CODE && this.input) {
      this.input.click();
    }
  }

  setFocusState() {
    this.setState({ focused: true });
  }

  unsetFocusState() {
    this.setState({ focused: false });
  }

  changeFile(event: SyntheticEvent<HTMLInputElement>) {
    const { currentTarget } = event;
    const { files } = currentTarget;

    if (files && files.length > 0) {
      const file = files[0];
      this.props.onChange(file);
      currentTarget.value = '';
      const dropZone = currentTarget.parentElement;
      setTimeout(() => {
        if (dropZone instanceof HTMLElement) dropZone.blur();
      }, 50);
    }
  }

  setInput(ref: HTMLInputElement | null) {
    this.input = ref;
  }

  render() {
    const { accept, children } = this.props;

    return (
      <div
        onDragOver={this.fileDragEnter}
        onDragLeave={this.fileDragLeave}
        onDrop={this.fileDrop}
        onClick={this.openFileSelector}
        onKeyPress={this.onZoneKeyPress}
        onFocus={this.setFocusState}
        onBlur={this.unsetFocusState}
        role="button"
        tabIndex={0}
        style={containerStyle}
      >
        {children(this.state)}
        <input
          ref={this.setInput}
          type="file"
          accept={accept}
          onChange={this.changeFile}
          style={inputStyle}
        />
      </div>
    );
  }
}

export default Dropzone;
