import { Upload, message, Button, Icon } from "antd";
import * as urls from "../../utils/urls";
import reqwest from "reqwest";

export default class ImpEntitySegments extends React.Component {
  state = {
    fileList: [],
    uploading: false
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("file", file);
    });

    this.setState({
      uploading: true
    });

    // You can use any AJAX library you like
    reqwest({
      url: urls.getImpOrganizationUrl(),
      method: "post",
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false
        });
        message.success("upload successfully.");
      },
      error: () => {
        this.setState({
          uploading: false
        });
        message.error("upload failed.");
      }
    });
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };

    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> 请选择要导入的症状片段信息文件
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 8 }}
        >
          {uploading ? "Uploading" : "开始导入"}
        </Button>
      </div>
    );
  }
}
