/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-11 16:51:49
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-11 17:05:25
 */
import styled from '@emotion/styled'

export const Row = styled.div<{
    gap?: number | boolean;
    between?:boolean;
    marginBottom?: number;
  }>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.between ? 'space-between' : undefined};
    margin-bottom: ${props => props.marginBottom + 'rem'};
    > * {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem': undefined};
    }
`