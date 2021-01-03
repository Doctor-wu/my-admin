import React from 'react';
import { Breadcrumb } from "antd";
import { routeItem } from '../routes/utils';
import "../style/DTBreadcrumb.scss"

interface IBreadcrumbProps {
    target?: routeItem
}

const DTBreadcrumb = (props:IBreadcrumbProps) => {
    return (
        <Breadcrumb className="dt_breadcrumb">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application Center</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
    );
}

export default DTBreadcrumb;
