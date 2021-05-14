import * as React from 'react';
import styles from './Links.module.scss';
import { ILinksProps } from './ILinksProps';
import { Stack } from '@fluentui/react';

const Links = (props: ILinksProps) => {
    const _links = props.links;
    return (
        <div className={`${styles.links} ${props.visible ? styles.visible : styles.hidden}`}>
            <div className={styles.content}>
                <Stack horizontal wrap tokens={{ childrenGap: 40 }}>
                    {_links.map((g) => {
                        return (<div>
                            <div className={styles.groupTitle}>{g.GroupTitle}</div>
                            <Stack horizontal wrap maxWidth={500} tokens={{ childrenGap: 10 }}>
                                {g.Links.map((item) => {
                                    return (
                                        <a href={item.Url.Url} aria-lable={item.Url.Description} target="_blank">
                                            <img className={styles.image} src={item.Image.Url} aria-label={item.Image.Description}></img>
                                        </a>);
                                })}
                            </Stack>
                        </div>);
                    })}                    
                </Stack>
            </div>
        </div>
    );
};

export default Links;