import React, {Component} from 'react';

class SidePanel extends Component {
    render() {
        return (
            <React.Fragment>
                <SidePanel id="sidepanel">
                    <SideTabMenuContainer
                        title="Mappings "
                        listItems={mappings}
                        onItemClick={this.loadDependencyMap}
                        onCreateNewItem={this.props.postMapping}
                    />

                    <SideTabMenuContainer
                        title="Categories"
                        listItems={tags}
                        onItemClick={this.setCategoryDetail}
                        onCreateNewItem={({id}) => this.props.postMapping({mappingName: id})}
                    />
                </SidePanel>

                <SidePanel id="mapping" wide>

                    <MenuHeader>
                        {
                            this.props.activeMapping.name ?
                                this.props.activeMapping.name
                                : 'Select Mapping'
                        }
                    </MenuHeader>


                    <SideTabMenuContainer
                        noHeaderBlock
                        resources
                        title="Resources"
                        listItems={activeResources}
                        onItemClick={this.setResourceDetail}
                        onCreateNewItem={this.addResourceToMapping}
                    />

                </SidePanel>
            </React.Fragment>
        )
    }
}
