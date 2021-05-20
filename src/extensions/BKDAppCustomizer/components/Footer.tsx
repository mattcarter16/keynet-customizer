import * as React from 'react';
import styles from './Footer.module.scss';
import { DefaultButton, Label, Stack } from '@fluentui/react';
import * as strings from 'BKDApplicationCustomizerStrings';
import Links from './Links/Links';
import { Web } from '@pnp/sp/presets/all';
import { ILinkGroup } from './Links/ILinksProps';

const Footer = () => {

    const [expanded, setExpanded] = React.useState(false);
    const [toggleButtonIconName, setToggleButtonIconName] = React.useState('ChevronUp');
    const [links, setLinks] = React.useState([]);
    const [loadingLinks, setLoadingLinks] = React.useState(false);

    const _handleToggle = (): void => {
        const wasExpanded: boolean = expanded;

        setExpanded(!wasExpanded);
        setToggleButtonIconName(wasExpanded ? 'ChevronUp' : 'ChevronDown');
    };

    const _getLinks = async () => {
        setLoadingLinks(true);
        let result: ILinkGroup[] = [];
        

        try {
            // update this address to the site of the ControlledLinks list 
            let _web = await Web('https://bkdllp.sharepoint.com');
            // update 'ControlledLinks' to the list you are using
            let items = await _web.lists.getByTitle('BKDLinks').items
                .filter("Active eq 1")
                .orderBy('GroupOrder')
                .orderBy('Weight')
                .get();
            if (items) {
                console.log(items);
                items.map((v) => {
                    if (result.length === 0 || v.GroupOrder !== result[result.length - 1].GroupId) {
                        result.push({
                            GroupId: v.GroupOrder,
                            GroupTitle: v.Group,
                            Links: [{
                                Url: v.URL,
                                Image: v.Image_x0020_URL,
                                Weight: v.Weight
                            }]
                        });
                    } else {
                        result[result.length - 1].Links.push({
                            Url: v.URL,
                            Image: v.Image_x0020_URL,
                            Weight: v.Weight
                        });
                    }
                });
            }
            setLinks(result);
            setLoadingLinks(true);

        } catch (error) {
            setLoadingLinks(true);
            console.log(error);
        }
    };

    React.useEffect(() => {
        _getLinks();
    }, []);

    console.log(links);

    return (
        <div className={styles.footer}>
            <Links links={links} loadingLinks={loadingLinks} visible={expanded} />
            <div className={styles.main}>
                <Stack horizontal wrap tokens={{ childrenGap: 15 }}>
                    <Stack.Item>
                        <div onClick={_handleToggle}>
                            <div className={styles.toggleControl}>
                                <DefaultButton
                                    iconProps={{ iconName: toggleButtonIconName }}
                                    title={expanded ? strings.ToggleButtonClose : strings.ToggleButtonOpen}
                                    className={styles.toggleButton}
                                    onClick={_handleToggle}
                                />
                            </div>
                        </div>
                    </Stack.Item>
                    <Stack.Item grow>
                        <div>
                            <Label className={styles.label}>BKD LINKS</Label>
                        </div>
                    </Stack.Item>
                </Stack>
            </div>
        </div>
    );
};

export default Footer;